extern crate warp;

use warp::http::StatusCode;
use scylla::Session;
use std::sync::Arc;
use tracing::info;
use crate::db::interactions::entity::{
    create_user, create_rogue, get_user_by_id, get_rogue_by_email
};

use crate::datatype::entity_type::{CreateUserInput, CreateRogueInput};
use warp::reject::Reject;
use warp::Filter;

#[derive(Debug)]
pub enum ApiError {
    InternalServerError,
    ValidationError(String),
}

impl Reject for ApiError {}

pub fn routes(session: Arc<Session> ) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let create_user = create_user_route(session.clone());
    let create_rogue = create_rogue_route(session.clone());
    let get_user = get_user_route(session.clone());
    let get_rogue = get_rogue_route(session);

    create_user.or(create_rogue).or(get_user).or(get_rogue)
}

pub fn create_rogue_route(session: Arc<Session>) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    info!("Function \"create_rogue_use\" called.");
    warp::path!("create_rogue")
        .and(warp::post())
        .and(with_session(session))
        .and(warp::body::json())
        .and_then(handle_create_rogue_user)
}
pub fn create_user_route(session: Arc<Session>) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    info!("Function \"create_user_route\" called.");
    warp::path!("create_user")
        .and(warp::post())
        .and(with_session(session))
        .and(warp::body::json())
        .and_then(handle_create_user)
}
async fn handle_create_rogue_user(session: Arc<Session>, rogue_user: CreateRogueInput) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Function \"handle_create_rogue_route\" called.");
    match create_rogue(session.clone(), rogue_user).await {
        Ok(_) => {
            info!("Rogue user created successfully!");
            Ok(warp::reply::with_status("Rogue user created successfully!", StatusCode::CREATED))
        }
        Err(e) => {
            eprintln!("Error occured while creating rogue: {:?}", e);
            info!("Error occured while creating rogue: {:?}", e);
            let custom_error = map_error_to_api_error(e);
            Err(warp::reject::custom(custom_error))
        }
    }
}

async fn handle_create_user(session: Arc<Session>, user: CreateUserInput) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Function \"handle_create_user_route\" called.");
    match create_user(session.clone(), user).await {
        Ok(_) => {
            info!("User created successfully");
            Ok(warp::reply::with_status("User created successfully!", StatusCode::CREATED))
        }
        Err(e) => {
            // Log the error message for debugging purposes
            eprintln!("Error occurred while creating user: {:?}", e);
            info!("Error occurred while creating user: {:?}", e);
            // Map the error to our custom ApiError type
            let custom_error = map_error_to_api_error(e);

            Err(warp::reject::custom(custom_error))
        }
    }
}

pub fn get_user_route(session: Arc<Session>) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    info!("Function \"get_user_route\" called.");
    warp::path!("get_user_by_id" / String)
        .and(warp::get())
        .and(with_session(session))
        .and_then(|id, session| handle_get_user_by_id(session, id))
}

pub fn get_rogue_route(session: Arc<Session>) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    info!("Function \"get_rogue_route\" called.");
    warp::path!("get_rogue_by_email" / String)
        .and(warp::get())
        .and(with_session(session))
        .and_then(|email, session| handle_get_rogue_by_email(session, email))
}

async fn handle_get_user_by_id(session: Arc<Session>, id: String) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Function \"create_user_route\" called.");
    match get_user_by_id(session.clone(), id).await {
        Ok(user) => {
            info!("handle_get_user_by_id ok.");
            Ok(warp::reply::json(&user))
        }
        Err(e) => {
            eprintln!("Error occured while fetching user: {:?}", e);
            info!("Error occured while fetching user: {:?}", e);
            let custom_error = map_error_to_api_error(e);
            Err(warp::reject::custom(custom_error))
        }
    }
}

async fn handle_get_rogue_by_email(session: Arc<Session>, email: String) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Function \"handle_get_rogue_by_email\" called.");
    match get_rogue_by_email(session.clone(), email).await {
        Ok(rogue) => {
            info!("handle_get_rogue_by_email ok.");
            Ok(warp::reply::json(&rogue))
        }
        Err(e) => {
            eprintln!("Error occured while fetching rogue: {:?}", e);
            info!("Error occured while fetching rogue: {:?}", e);
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
    info!("Function \"map_error_to_api_error\" called in  entity_routes.");
    let error_string = error.to_string();
    if error_string.contains("Validation") {
        info!("error string contains \"Validation\"");
        ApiError::ValidationError(error_string)
    } else {
        info!("error string does not contains \"Validation\"");
        ApiError::InternalServerError
    }
}