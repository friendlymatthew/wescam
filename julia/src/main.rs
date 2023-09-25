extern crate dashmap;
extern crate redis;
extern crate warp;
use dashmap::DashMap;
use scylladb::configs::{
    prepared_queries::bond_queries, prepared_queries::entity_queries, prepared_queries::utility,
    scylla_config,
};
use std::env;
use crate::chat::forwarder::Forwarder;
use crate::chat::gateway::{create_gateway};
use pulsar::{Pulsar, TokioExecutor};
use std::error::Error;
use std::sync::{Arc};
use uuid::Uuid;
use warp::Filter;
use crate::chat::route::configure_ws_route;

#[path = "scylladb/mod.rs"]
mod scylladb;

#[path = "./api/mod.rs"]
mod api;

#[path = "pulsar_service/mod.rs"]
mod pulsar_service;

#[path = "chat/mod.rs"]
mod chat;

type WsMapping = Arc<DashMap<Uuid, tokio::sync::Mutex<warp::ws::WebSocket>>>;

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

    let redis_cache = redis::Client::open("redis://127.0.0.1/")?;
    let forwarder = Forwarder::new(Arc::new(redis_cache)).await?;

    let chat_gateway = create_gateway(pulsar_service.clone()).await?;
    let ws_map: WsMapping = Arc::new(DashMap::new());
    let ws_route = configure_ws_route(
        ws_map,
        Arc::new(chat_gateway)
    );


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
