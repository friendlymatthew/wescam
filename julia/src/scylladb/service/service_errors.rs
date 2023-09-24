use crate::scylladb::service::service_errors::Error::{
    DatabaseError, PulsarError, RedisCacheError,
};
use redis::RedisError;
use scylla::transport::errors::QueryError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
    #[error("Scylla DB error {0}")]
    DatabaseError(String),

    #[error("Query no match")]
    NotFound,

    #[error("Tracing error")]
    TracingError,

    #[error("Pulsar Error {0}")]
    PulsarError(String),

    #[error("Redis Error {0}")]
    RedisCacheError(String),

    #[error("Websocket Connection Error")]
    WsError,

    #[error("Serialization Error")]
    SerializationError,

    #[error("Parsing Error {0} ")]
    ParsingError(String),

    #[error("Mutex lock error")]
MutexError,
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

impl From<RedisError> for Error {
    fn from(err: RedisError) -> Error {
        RedisCacheError(format!("Redis error: {}", err))
    }
}
