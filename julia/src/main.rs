extern crate warp;

use warp::Filter;
use scylla::{Session, SessionBuilder};
use std::error::Error;
use std::sync::Arc;

mod db;
mod datatype;
mod api;


#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let uri = std::env::var("SCYLLA_URI")
        .unwrap_or_else(|_| "127.0.0.1:9042".to_string());

    let session: Session = SessionBuilder::new()
        .known_node(uri)
        .build()
        .await?;

    db::configs::table_config::create_tables(&session).await?; // Use the function from the db::table_config module

    let health = warp::path!("health")
        .map(|| format!("Server is healthy"));

    let api = api::entity_routes::routes(Arc::new(session));

    // Move warp serve to here, so it's reachable
    warp::serve(api).run(([127, 0, 0, 1], 8080)).await;

    Ok(())
}