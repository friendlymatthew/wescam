use crate::api::api_errors::handle_rejection;
use crate::api::handlers::entity_handler::{
    handle_create_rogue_user, handle_create_user, handle_get_rogue_by_email,
    handle_get_user_by_guid,
};
use crate::scylladb::configs::prepared_queries::entity_queries::EntityQueries;
use scylla::Session;
use std::sync::Arc;
use uuid::Uuid;
use warp::Filter;

pub fn routes(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let create_user = create_user_route(session.clone(), prepared_queries.clone());
    let create_rogue = create_rogue_route(session.clone(), prepared_queries.clone());
    let get_user = get_user_route(session.clone(), prepared_queries.clone());
    let get_rogue = get_rogue_route(session, prepared_queries.clone());

    let all_routes = create_user.or(create_rogue).or(get_user).or(get_rogue);

    all_routes.recover(handle_rejection)
}

pub fn create_rogue_route(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("create_rogue")
        .and(warp::post())
        .and(with_session(session))
        .and(with_prepared_queries(prepared_queries))
        .and(warp::body::json())
        .and_then(handle_create_rogue_user)
}

pub fn create_user_route(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("create_user")
        .and(warp::post())
        .and(with_session(session))
        .and(with_prepared_queries(prepared_queries))
        .and(warp::body::json())
        .and_then(handle_create_user)
}

pub fn get_user_route(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("get_user_by_guid" / Uuid)
        .and(warp::get())
        .and(with_session(session))
        .and(with_prepared_queries(prepared_queries))
        .and_then(|guid, session, prepared_queries| {
            handle_get_user_by_guid(session, prepared_queries, guid)
        })
}

pub fn get_rogue_route(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("get_rogue_by_email" / String)
        .and(warp::get())
        .and(with_session(session))
        .and(with_prepared_queries(prepared_queries))
        .and_then(|email, session, prepared_queries| {
            handle_get_rogue_by_email(session, prepared_queries, email)
        })
}

fn with_prepared_queries(
    prepared_queries: Arc<EntityQueries>,
) -> impl Filter<Extract = (Arc<EntityQueries>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || prepared_queries.clone())
}

fn with_session(
    session: Arc<Session>,
) -> impl Filter<Extract = (Arc<Session>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || session.clone())
}
