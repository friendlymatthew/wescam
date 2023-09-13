use warp::{Filter, Rejection};
use warp::http::StatusCode;
use scylla::Session;
use std::sync::Arc;
use crate::db::interactions::bond::{form_bond, get_bonds_by_user_id};
use crate::datatype::bond_type::{CreateBondInput, Bond};
use warp::reject::Reject;

#[derive(Debug)]
pub enum ApiError {
    InternalServerError,
    ValidationError(String),
}

impl Reject for ApiError {}

pub fn routes(session: Arc<Session>) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    create_user_route(session)
}

pub fn create_user_route(session: Arc<Session>) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("create_user")
        .and(warp::post())
        .and(with_session(session))
        .and(warp::body::json())
        .and_then(handle_create_user)
}

async fn handle_create_user(session: Arc<Session>, bond: CreateBondInput) -> Result<impl warp::Reply, warp::Rejection> {
    match form_bond(&session, bond).await {
        Ok(_) => Ok(warp::reply::with_status("Bond created successfully!", StatusCode::CREATED)),
        Err(e) => {
            // Log the error message for debugging purposes
            eprintln!("Error occurred while creating bond: {:?}", e);

            // Map the error to our custom ApiError type
            let custom_error = map_error_to_api_error(e);

            Err(warp::reject::custom(custom_error))
        }
    }
}

fn with_session(
    session: Arc<Session>,
) -> impl Filter<Extract = (Arc<Session>, ), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || session.clone())
}

fn map_error_to_api_error<T: ToString>(error: T) -> ApiError {
    let error_string = error.to_string();
    if error_string.contains("Validation") {
        ApiError::ValidationError(error_string)
    } else {
        ApiError::InternalServerError
    }
}