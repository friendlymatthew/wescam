extern crate warp;

use warp::Filter;
use scylla::{Session, SessionBuilder};
use std::error::Error;
use std::sync::Arc;

#[path = "./db/mod.rs"]
mod db;

#[path ="./datatype/mod.rs"]
mod datatype;

#[path="./api/mod.rs"]
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


    let health_route = warp::path!("health")
        .map(|| format!("Server is healthy"));

    let session_arc = Arc::new(session);

    let entity_route = api::entity_routes::routes(session_arc.clone());
    let bond_route = api::bond_routes::routes(session_arc.clone());

    let all_routes = health_route.or(entity_route).or(bond_route);

    warp::serve(all_routes).run(([127, 0, 0, 1], 8080)).await;

    Ok(())
}