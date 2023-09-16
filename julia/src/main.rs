extern crate warp;

use db::configs::{prepare_entity_query, table_config};
use scylla::{Session, SessionBuilder};
use std::error::Error;
use std::sync::Arc;
use tracing::info;
use warp::Filter;

#[path = "./db/mod.rs"]
mod db;

#[path = "./datatype/mod.rs"]
mod datatype;

#[path = "./api/mod.rs"]
mod api;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    tracing_subscriber::fmt::init();

    let uri = std::env::var("SCYLLA_URI").unwrap_or_else(|_| "127.0.0.1:9042".to_string());

    info!("Connecting to {}", uri);

    let session: Session = SessionBuilder::new().known_node(uri).build().await?;

    table_config::initialize(&session).await?;

    let session_arc = Arc::new(session);

    let prepared_entity_queries =
        prepare_entity_query::PreparedEntityQueries::new(session_arc.clone()).await?;
    let prepared_entity_queries = Arc::new(prepared_entity_queries);

    let entity_route =
        api::entity_routes::routes(session_arc.clone(), prepared_entity_queries.clone());
    let bond_route = api::bond_routes::routes(session_arc.clone());

    let health_route = warp::path!("health").map(|| format!("Server is healthy"));

    let all_routes = health_route.or(entity_route).or(bond_route);

    warp::serve(all_routes).run(([127, 0, 0, 1], 8080)).await;

    Ok(())
}
