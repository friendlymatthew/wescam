extern crate warp;

use warp::Filter;
use scylla::{Session, SessionBuilder};
use std::error::Error;
use std::sync::Arc;
use tracing::{info, warn, error};

#[path = "./db/mod.rs"]
mod db;

#[path ="./datatype/mod.rs"]
mod datatype;

#[path="./api/mod.rs"]
mod api;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {

    tracing_subscriber::fmt::init();

    let uri = std::env::var("SCYLLA_URI")
        .unwrap_or_else(|_| "127.0.0.1:9042".to_string());

    info!("Connecting to ScyllaDB at URI: {}", uri);

    let session: Session = SessionBuilder::new()
        .known_node(uri)
        .build()
        .await
        .map_err(|e| {
          error!("Failed to build session: {}", e);
            e
        })?;

    info!("ScyllaDB session built successfully");

    match db::configs::table_config::create_tables(&session).await {
        Ok(_) => info!("Successfully created tables"),
        Err(e) => warn!("Failed to generate julia keyspace and tables: {}", e),
    }

    let session_arc = Arc::new(session);
    info!("Arc session created.");

    let prepared_entity_queries = db::configs::prepare_entity_query::PreparedEntityQueries::new(session_arc.clone()).await
        .map_err(|e| {
            error!("Failed to prepare entity queries: {}", e);
            e
        })?;
    info!("Entity queries prepared");

    let prepared_entity_queries = Arc::new(prepared_entity_queries);

    let entity_route = api::entity_routes::routes(session_arc.clone(), prepared_entity_queries.clone());
    info!("Entity routes configured");

    let bond_route = api::bond_routes::routes(session_arc.clone());
    info!("Bond routes configured");

    let health_route = warp::path!("health")
        .map(|| {
            info!("Health check triggered");
            format!("Server is healthy")
        });

    let all_routes = health_route.or(entity_route).or(bond_route);


    info!("Starting the server at 127.0.0.1:8080");
    warp::serve(all_routes).run(([127, 0, 0, 1], 8080)).await;

    Ok(())
}