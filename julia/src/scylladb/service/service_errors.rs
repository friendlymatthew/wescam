use scylla::transport::errors::QueryError;
use thiserror::Error;
use crate::scylladb::service::service_errors::Error::{DatabaseError, PulsarError};

#[derive(Debug, Error)]
pub enum Error {
    #[error("Scylla DB error {0}")]
    DatabaseError(String),

    #[error("Query no match")]
    NotFound,

    #[error("Pulsar Error {0}")]
    PulsarError(String),
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

impl From<pulsar::Error> for Error {
    fn from(err: pulsar::Error) -> Error {
        PulsarError(format!("Pulsar error arose: {}", err))
    }
}