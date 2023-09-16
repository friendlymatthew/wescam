use scylla::Session;
use std::error::Error;
use std::sync::Arc;
use tracing::{error, info, warn};
use warp::Filter;
#[path = "./db/mod.rs"]
mod db;
use crate::db::config::{db_config, route_config, table_config};
#[path = "./datatype/mod.rs"]
mod datatype;
#[path = "routes/mod.rs"]
mod routes;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    tracing_subscriber::fmt::init();

    let uri_key = "SCYLLA_URI";
    let session: Session = db_config::initialize(uri_key).await.map_err(|e| {
        error!("Failed to build session");
        e
    })?;

    match table_config::initialize(&session).await {
        Ok(_) => info!("Successfully generated julia keyspace and tables"),
        Err(e) => warn!("Failed to generate julia keyspace and tables: {}", e),
    }

    let session_arc = Arc::new(session);
    let all_routes = route_config::initialize(session_arc.clone()).await?;

    info!("Starting the server at 127.0.0.1:8080");
    warp::serve(all_routes).run(([127, 0, 0, 1], 8080)).await;

    Ok(())
}
