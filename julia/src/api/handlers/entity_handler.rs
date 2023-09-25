use crate::api::api_errors::map_error_to_api_error;
use crate::scylladb::configs::prepared_queries::entity_queries::EntityQueries;
use crate::scylladb::datatype::entity_type::{CreateRogueInput, CreateUserInput, Rogue, User};
use crate::scylladb::service::entity::{
    create_rogue, create_user, get_rogue_by_email, get_user_by_guid,
};
use scylla::Session;
use serde::Serialize;
use std::sync::Arc;
use uuid::Uuid;
use warp::http::StatusCode;

#[derive(Serialize)]
pub struct SingleRogueResponse {
    pub message: String,
    pub rogue: Rogue,
}

#[derive(Serialize)]
pub struct SingleUserResponse {
    pub message: String,
    pub user: User,
}

pub async fn handle_create_user(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    user: CreateUserInput,
) -> Result<impl warp::Reply, warp::Rejection> {
    match create_user(session.clone(), prepared_queries.clone(), user).await {
        Ok(user) => {
            let response = SingleUserResponse {
                message: "User created successfully!".to_string(),
                user,
            };

            let json_res = warp::reply::json(&response);

            Ok(warp::reply::with_status(json_res, StatusCode::CREATED))
        }
        Err(e) => {
            eprintln!("Error occurred while creating user: {:?}", e);

            let custom_error = map_error_to_api_error(e);
            Err(warp::reject::custom(custom_error))
        }
    }
}

pub async fn handle_create_rogue_user(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    rogue_user: CreateRogueInput,
) -> Result<impl warp::Reply, warp::Rejection> {
    match create_rogue(session.clone(), prepared_queries.clone(), rogue_user).await {
        Ok(rogue) => {
            let response = SingleRogueResponse {
                message: "Rogue user created successfully!".to_string(),
                rogue,
            };

            let json_res = warp::reply::json(&response);

            Ok(warp::reply::with_status(json_res, StatusCode::CREATED))
        }
        Err(e) => {
            eprintln!("Error occurred while creating rogue: {:?}", e);

            let custom_error = map_error_to_api_error(e);
            Err(warp::reject::custom(custom_error))
        }
    }
}

pub async fn handle_get_user_by_guid(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    guid: Uuid,
) -> Result<impl warp::Reply, warp::Rejection> {
    match get_user_by_guid(session.clone(), prepared_queries.clone(), guid).await {
        Ok(user) => Ok(warp::reply::json(&user)),
        Err(e) => {
            eprintln!("Error occurred while fetching user: {:?}", e);
            let custom_error = map_error_to_api_error(e);
            Err(warp::reject::custom(custom_error))
        }
    }
}

pub async fn handle_get_rogue_by_email(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    email: String,
) -> Result<impl warp::Reply, warp::Rejection> {
    match get_rogue_by_email(session.clone(), prepared_queries.clone(), email).await {
        Ok(rogue) => {
            let response = SingleRogueResponse {
                message: "Rogue user config found".to_string(),
                rogue,
            };

            let json_res = warp::reply::json(&response);
            Ok(json_res)
        }
        Err(e) => {
            eprintln!("Error occured while fetching rogue: {:?}", e);
            let custom_error = map_error_to_api_error(e);
            Err(warp::reject::custom(custom_error))
        }
    }
}
