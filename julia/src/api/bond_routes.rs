use warp::{Filter};
use scylla::Session;
use warp::http::StatusCode;
use std::sync::Arc;
use crate::db::interactions::bond::{form_bond, get_bonds_by_user_id};
use crate::datatype::bond_type::{CreateBondInput};
use warp::reject::Reject;
use crate::db::configs::prepare_bond_queries::PreparedBondQueries;

#[derive(Debug)]
pub enum ApiError {
    InternalServerError,
    ValidationError(String),
}

impl Reject for ApiError {}

pub fn routes(
    session: Arc<Session>,
    prepared_queries: Arc<PreparedBondQueries>
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let create_bond = create_bond_route(session.clone(), prepared_queries.clone());
    let get_user_bonds = get_bonds_by_user_id_route(session.clone(), prepared_queries.clone());

    create_bond.or(get_user_bonds)
}

pub fn create_bond_route(
    session: Arc<Session>,
    prepared_queries: Arc<PreparedBondQueries>
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("create_bond")
        .and(warp::post())
        .and(with_session(session))
        .and(with_prepared_queries(prepared_queries))
        .and(warp::body::json())
        .and_then(handle_create_bond)
}

async fn handle_create_bond(
    session: Arc<Session>,
    prepared_queries: Arc<PreparedBondQueries>,
    bond: CreateBondInput
) -> Result<impl warp::Reply, warp::Rejection> {
    match form_bond(session.clone(), prepared_queries.clone(), bond).await {
        Ok(_) => Ok(warp::reply::with_status("Bond created successfully!", StatusCode::CREATED)),
        Err(e) => {
            eprintln!("Error occurred while creating bond: {:?}", e);

            let custom_error = map_error_to_api_error(e);

            Err(warp::reject::custom(custom_error))
        }
    }
}


pub fn get_bonds_by_user_id_route(
    session: Arc<Session>,
    prepared_queries: Arc<PreparedBondQueries>
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("get_user_bonds" / String)
        .and(warp::get())
        .and(with_session(session))
        .and(with_prepared_queries(prepared_queries))
        .and_then(|id, session, prepared_queries| handle_get_bonds_by_user_id(session, prepared_queries, id))
}

async fn handle_get_bonds_by_user_id(
    session: Arc<Session>,
    prepared_queries: Arc<PreparedBondQueries>,
    id: String
) -> Result<impl warp::Reply, warp::Rejection> {
    match get_bonds_by_user_id(session.clone(), prepared_queries.clone(), id).await {
        Ok(user) => Ok(warp::reply::json(&user)),
        Err(e) => {
            eprintln!("Error occurred while fetching user: {:?}", e);
            let custom_error = map_error_to_api_error(e);
            Err(warp::reject::custom(custom_error))
        }
    }
}

fn with_prepared_queries(
    prepared_queries: Arc<PreparedBondQueries>,
) -> impl Filter<Extract = (Arc<PreparedBondQueries>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || prepared_queries.clone())
}


pub fn with_session(
    session: Arc<Session>,
) -> impl Filter<Extract = (Arc<Session>, ), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || session.clone())
}

pub fn map_error_to_api_error<T: ToString>(error: T) -> ApiError {
    let error_string = error.to_string();
    if error_string.contains("Validation") {
        ApiError::ValidationError(error_string)
    } else {
        ApiError::InternalServerError
    }
}