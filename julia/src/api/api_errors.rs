use warp::http::StatusCode;
use warp::reject::Reject;
use db::service::service_errors::Error;
use crate::db;

#[derive(Debug)]
pub enum ApiError {
    InternalServerError,
    ValidationError(String),
    NotFound,
}

impl Reject for ApiError {}

pub fn map_error_to_api_error(error: Error) -> ApiError{
    match error {
        Error::DatabaseError(msg) => ApiError::NotFound,
        Error::NotFound => ApiError::NotFound,
        _ => ApiError::InternalServerError,
    }
}

pub async fn handle_rejection(err: warp::Rejection) -> Result<impl warp::Reply, warp::Rejection> {
    if let Some(custom_error) = err.find::<ApiError>() {
        let status_code = match custom_error {
            ApiError::InternalServerError => StatusCode::INTERNAL_SERVER_ERROR,
            ApiError::NotFound => StatusCode::NOT_FOUND,
            ApiError::ValidationError(_) => StatusCode::BAD_REQUEST,
        };

        let json_res = warp::reply::json(&format!("Error: {:?}", custom_error));
        return Ok(warp::reply::with_status(json_res, status_code));
    }
    Err(err)
}