extern crate redis;
extern crate warp;

use scylladb::configs::{
    prepared_queries::bond_queries, prepared_queries::entity_queries, prepared_queries::utility,
    scylla_config,
};
use std::collections::HashMap;
use std::env;

use crate::chat::forwarder::Forwarder;
use crate::chat::gateway::{create_gateway, user_connected};
use pulsar::{Pulsar, TokioExecutor};
use std::error::Error;
use std::sync::Arc;
use warp::Filter;

#[path = "scylladb/mod.rs"]
mod scylladb;

#[path = "./api/mod.rs"]
mod api;

#[path = "pulsar_service/mod.rs"]
mod pulsar_service;

#[path = "chat/mod.rs"]
mod chat;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    tracing_subscriber::fmt::init();

    let scylla_uri = env::var("SCYLLA_URI").unwrap_or_else(|_| "127.0.0.1:9042".to_string());
    let pulsar_addr = env::var("PULSAR_ADDRESS")
        .ok()
        .unwrap_or_else(|| "pulsar://127.0.0.1:6650".to_string());

    let scylla_service = scylla_config::ScyllaConfig::create_session(scylla_uri).await?;
    scylla_service.populate_table().await?;

    let pulsar_service = Arc::new(
        Pulsar::builder(pulsar_addr, TokioExecutor)
            .build()
            .await
            .expect("Failed to create Pulsar Service"),
    );

    // TODO! implement redis cache
    let redis_cache = redis::Client::open("redis://127.0.0.1/")?;
    let forwarder = Forwarder::new(Arc::new(redis_cache)).await?;

    let chat_gateway = create_gateway(pulsar_service.clone()).await?;

    let ws_route = warp::path("chat")
        .and(warp::ws())
        .and(warp::query::<HashMap<String, String>>())
        .map({
            let chat_gateway = chat_gateway.clone();
            move |ws: warp::ws::Ws, query_map: HashMap<String, String>| {
                let user_guid = query_map
                    .get("guid")
                    .cloned()
                    .unwrap_or_else(|| "".to_string());

                ws.on_upgrade({
                    let msg_producer = chat_gateway.msg_producer.clone();
                    let presence_producer = chat_gateway.presence_producer.clone();

                    move |socket| {
                        let user_guid = user_guid.clone();
                        async move {
                            let user_connected_fut =
                                user_connected(msg_producer, presence_producer, socket, user_guid);
                            let handle = tokio::spawn(user_connected_fut);
                            if let Err(e) = handle.await {
                                println!("Failed to execute user_connected: {}", e);
                            }
                        }
                    }
                })
            }
        });

    let prepared_entity_queries = utility::wrap_prepared_queries::<entity_queries::EntityQueries>(
        scylla_service.session.clone(),
    )
    .await?;

    let prepared_bond_queries =
        utility::wrap_prepared_queries::<bond_queries::BondQueries>(scylla_service.session.clone())
            .await?;

    let entity_route = api::routes::entity_route::routes(
        scylla_service.session.clone(),
        prepared_entity_queries.clone(),
    );

    let bond_route = api::routes::bond_route::routes(
        scylla_service.session.clone(),
        prepared_bond_queries.clone(),
        pulsar_service.clone(),
    );

    let health_route = warp::path!("health").map(|| format!("Server is healthy"));

    let all_routes = health_route.or(entity_route).or(bond_route).or(ws_route);

    warp::serve(all_routes).run(([127, 0, 0, 1], 8080)).await;

    Ok(())
}
