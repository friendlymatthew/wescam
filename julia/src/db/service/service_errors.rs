use scylla::transport::errors::QueryError;
use thiserror::Error;
use crate::db::service::service_errors::Error::DatabaseError;

#[derive(Debug, Error)]
pub enum Error {
    #[error("Scylla DB error {0}")]
    DatabaseError(String),

    #[error("Query no match")]
    NotFound,
}

impl From<QueryError> for Error {
    fn from(err: QueryError) -> Error {
        DatabaseError(format!("Scylla Query Error: {}", err))
    }
}

impl From<scylla::cql_to_rust::FromRowError> for Error {
    fn from(err: scylla::cql_to_rust::FromRowError) -> Error {
        DatabaseError(format!("Scylla Row Parsing Error: {}", err))
    }
}

