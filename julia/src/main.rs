extern crate warp;

use std::env;
use scylladb::configs::{
    prepared_queries::bond_queries, prepared_queries::entity_queries, prepared_queries::utility,
    scylla_config,
};
use std::error::Error;
use pulsar::{Pulsar, TokioExecutor};
use warp::Filter;

#[path = "scylladb/mod.rs"]
mod scylladb;

#[path = "./api/mod.rs"]
mod api;

#[path = "pulsar_service/mod.rs"]
mod pulsar_service;


#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    tracing_subscriber::fmt::init();

    let scylla_uri = env::var("SCYLLA_URI").unwrap_or_else(|_| "127.0.0.1:9042".to_string());
    let pulsar_addr = env::var("PULSAR_ADDRESS")
        .ok()
        .unwrap_or_else(|| "pulsar://127.0.0.1:6650".to_string());


    let scylla_service = scylla_config::ScyllaConfig::create_session(scylla_uri).await?;
    scylla_service.populate_table().await?;

    /*
    let pulsar_service = Pulsar::builder(pulsar_addr, TokioExecutor)
        .build()
        .await?;
     */

    let prepared_entity_queries = utility::wrap_prepared_queries::<entity_queries::EntityQueries>(
        scylla_service.session.clone(),
    )
    .await?;

    let entity_route = api::entity_routes::routes(
        scylla_service.session.clone(),
        prepared_entity_queries.clone(),
    );

    let prepared_bond_queries =
        utility::wrap_prepared_queries::<bond_queries::BondQueries>(scylla_service.session.clone())
            .await?;

    let bond_route = api::bond_routes::routes(
        scylla_service.session.clone(),
        prepared_bond_queries.clone(),
    );

    let health_route = warp::path!("health").map(|| format!("Server is healthy"));

    let all_routes = health_route.or(entity_route).or(bond_route);

    warp::serve(all_routes).run(([127, 0, 0, 1], 8080)).await;

    Ok(())
}
