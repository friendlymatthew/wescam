extern crate warp;
use db::configs::{
    prepared_queries::bond_queries, prepared_queries::entity_queries, prepared_queries::utility,
    scylla_config,
};
use std::error::Error;
use warp::Filter;

#[path = "./db/mod.rs"]
mod db;

#[path = "./api/mod.rs"]
mod api;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    tracing_subscriber::fmt::init();

    let uri = std::env::var("SCYLLA_URI").unwrap_or_else(|_| "127.0.0.1:9042".to_string());

    let scylla_service = scylla_config::ScyllaConfig::create_session(uri).await?;
    scylla_service.populate_table().await?;

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
