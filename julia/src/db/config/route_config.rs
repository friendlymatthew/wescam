use crate::db::config::prepare_bond_query::PreparedBondQueries;
use crate::db::config::prepare_entity_query::PreparedEntityQueries;
use crate::routes;
use scylla::Session;
use std::error::Error;
use std::sync::Arc;
use tracing::{error, info};
use warp::Filter;

pub async fn initialize(
    session_arc: Arc<Session>,
) -> Result<impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone, Box<dyn Error>>
{
    let prepared_entity_queries = PreparedEntityQueries::new(session_arc.clone())
        .await
        .map_err(|e| {
            error!("Failed to prepare entity queries: {}", e);
            e
        })?;

    info!("Entity queries prepared");

    let prepared_entity_queries = Arc::new(prepared_entity_queries);

    let entity_route =
        routes::entity_routes::routes(session_arc.clone(), prepared_entity_queries.clone());
    info!("Entity routes configured");

    let prepared_bond_queries = PreparedBondQueries::new(session_arc.clone())
        .await
        .map_err(|e| {
            error!("Failed to prepare bond queries: {}", e);
            e
        })?;

    info!("Bond queries prepared");
    let prepared_bond_queries = Arc::new(prepared_bond_queries);

    let bond_route = routes::bond_routes::routes(session_arc.clone(), prepared_bond_queries);
    info!("Bond routes configured");

    let health_route = warp::path!("health").map(|| {
        info!("Health check triggered");
        format!("Server is healthy")
    });

    let all_routes = health_route.or(entity_route).or(bond_route);

    Ok(all_routes)
}
