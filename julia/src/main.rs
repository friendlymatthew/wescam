extern crate warp;

use db::configs::{prepared_queries::bond_queries, prepared_queries::entity_queries, table_config};
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

pub async fn drop_table(session: Arc<Session>) -> Result<(), Box<dyn Error>> {
    let drop_query = "DROP TABLE IF EXISTS julia.rogues";

    session.query(drop_query, &[]).await?;
    println!("Table dropped successfully");

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    tracing_subscriber::fmt::init();

    let uri = std::env::var("SCYLLA_URI").unwrap_or_else(|_| "127.0.0.1:9042".to_string());

    info!("Connecting to {}", uri);

    let session: Session = SessionBuilder::new().known_node(uri).build().await?;

    let session_arc = Arc::new(session);
    // Now clone the Arc and pass it to the function
    drop_table(session_arc.clone()).await?;

    // Initialize tables
    table_config::initialize(&session_arc).await?;

    let prepared_entity_queries = entity_queries::EntityQueries::new(session_arc.clone()).await?;
    let prepared_entity_queries = Arc::new(prepared_entity_queries);
    let entity_route =
        api::entity_routes::routes(session_arc.clone(), prepared_entity_queries.clone());

    let prepared_bond_queries = bond_queries::BondQueries::new(session_arc.clone()).await?;
    let prepared_bond_queries = Arc::new(prepared_bond_queries);
    let bond_route = api::bond_routes::routes(session_arc.clone(), prepared_bond_queries);

    let health_route = warp::path!("health").map(|| format!("Server is healthy"));

    let all_routes = health_route.or(entity_route).or(bond_route);

    warp::serve(all_routes).run(([127, 0, 0, 1], 8080)).await;

    Ok(())
}
