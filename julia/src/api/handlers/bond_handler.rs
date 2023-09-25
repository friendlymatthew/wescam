use crate::api::api_errors::map_error_to_api_error;
use crate::scylladb::configs::prepared_queries::bond_queries::BondQueries;
use crate::scylladb::datatype::bond_type::CreateBondInput;
use crate::scylladb::service::bond::{form_bond, get_bonds_by_user_guid};
use pulsar::{Pulsar, TokioExecutor};
use scylla::Session;
use std::sync::Arc;
use uuid::Uuid;
use warp::http::StatusCode;

// TODO: REFACTOR TO STRUCT

pub async fn handle_create_bond(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
    pulsar_service: Arc<Pulsar<TokioExecutor>>,
    bond: CreateBondInput,
) -> Result<impl warp::Reply, warp::Rejection> {
    match form_bond(
        session.clone(),
        prepared_queries.clone(),
        pulsar_service.clone(),
        bond,
    )
    .await
    {
        Ok(_) => Ok(warp::reply::with_status(
            "Bond created successfully!",
            StatusCode::CREATED,
        )),
        Err(e) => {
            eprintln!("Error occurred while creating bond: {:?}", e);

            let custom_error = map_error_to_api_error(e);

            Err(warp::reject::custom(custom_error))
        }
    }
}

pub async fn handle_get_bonds_by_user_guid(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
    guid: Uuid,
) -> Result<impl warp::Reply, warp::Rejection> {
    match get_bonds_by_user_guid(session.clone(), prepared_queries.clone(), guid).await {
        Ok(user) => Ok(warp::reply::json(&user)),
        Err(e) => {
            eprintln!("Error occurred while fetching user: {:?}", e);
            let custom_error = map_error_to_api_error(e);
            Err(warp::reject::custom(custom_error))
        }
    }
}
