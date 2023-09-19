use crate::db::datatype::bond_type::CreateBondInput;
use crate::db::configs::prepared_queries::bond_queries::BondQueries;
use crate::db::service::bond::{form_bond, get_bonds_by_user_id};
use scylla::Session;
use std::sync::Arc;
use warp::http::StatusCode;
use warp::Filter;
use crate::api::api_errors::{handle_rejection, map_error_to_api_error};


pub fn routes(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let create_bond = create_bond_route(session.clone(), prepared_queries.clone());
    let get_user_bonds = get_bonds_by_user_id_route(session.clone(), prepared_queries.clone());

    let all_route = create_bond.or(get_user_bonds);
    all_route.recover(handle_rejection)
}

pub fn create_bond_route(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
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
    prepared_queries: Arc<BondQueries>,
    bond: CreateBondInput,
) -> Result<impl warp::Reply, warp::Rejection> {
    match form_bond(session.clone(), prepared_queries.clone(), bond).await {
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

pub fn get_bonds_by_user_id_route(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("get_user_bonds" / String)
        .and(warp::get())
        .and(with_session(session))
        .and(with_prepared_queries(prepared_queries))
        .and_then(|id, session, prepared_queries| {
            handle_get_bonds_by_user_id(session, prepared_queries, id)
        })
}

async fn handle_get_bonds_by_user_id(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
    id: String,
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
    prepared_queries: Arc<BondQueries>,
) -> impl Filter<Extract = (Arc<BondQueries>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || prepared_queries.clone())
}

fn with_session(
    session: Arc<Session>,
) -> impl Filter<Extract = (Arc<Session>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || session.clone())
}

