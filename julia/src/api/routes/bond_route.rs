use crate::api::api_errors::handle_rejection;
use crate::api::handlers::bond_handler::{handle_create_bond, handle_get_bonds_by_user_guid};
use crate::scylladb::configs::prepared_queries::bond_queries::BondQueries;
use pulsar::{Pulsar, TokioExecutor};
use scylla::Session;
use std::sync::Arc;
use uuid::Uuid;
use warp::Filter;

// TODO: REFACTOR TO STRUCT

pub fn routes(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
    pulsar_service: Arc<Pulsar<TokioExecutor>>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let create_bond = create_bond_route(
        session.clone(),
        prepared_queries.clone(),
        pulsar_service.clone(),
    );
    let get_user_bonds = get_bonds_by_user_guid_route(session.clone(), prepared_queries.clone());

    let all_route = create_bond.or(get_user_bonds);
    all_route.recover(handle_rejection)
}

pub fn create_bond_route(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
    pulsar_service: Arc<Pulsar<TokioExecutor>>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("create_bond")
        .and(warp::post())
        .and(with_session(session))
        .and(with_prepared_queries(prepared_queries))
        .and(with_producer(pulsar_service))
        .and(warp::body::json())
        .and_then(handle_create_bond)
}

pub fn get_bonds_by_user_guid_route(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("get_user_bonds" / Uuid)
        .and(warp::get())
        .and(with_session(session))
        .and(with_prepared_queries(prepared_queries))
        .and_then(|guid, session, prepared_queries| {
            handle_get_bonds_by_user_guid(session, prepared_queries, guid)
        })
}

fn with_producer(
    pulsar_service: Arc<Pulsar<TokioExecutor>>,
) -> impl Filter<Extract = (Arc<Pulsar<TokioExecutor>>,), Error = std::convert::Infallible> + Clone
{
    warp::any().map(move || pulsar_service.clone())
}

fn with_prepared_queries(
    prepared_queries: Arc<BondQueries>,
) -> impl Filter<Extract = (Arc<BondQueries>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || prepared_queries.clone())
}

fn with_session(
    session: Arc<Session>,
) -> impl Filter<Extract = (Arc<Session>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || session.clone())
}
