use crate::scylladb::service::service_errors::Error;
use crate::scylladb::service::service_errors::Error::RedisCacheError;
use redis::aio::Connection;
use redis::Client;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use uuid::Uuid;

#[derive(Deserialize, Serialize, Copy, Clone)]
pub enum Status {
    CONNECT,
    LEAVE,
}

#[derive(Deserialize, Serialize, Copy, Clone)]
pub struct Presence {
    pub user_guid: Uuid,
    pub socket_guid: Uuid,
    pub status: Status,
}

pub struct Forwarder {
    redis_connection: Arc<Connection>,
}

impl Forwarder {
    pub async fn new(redis_client: Arc<Client>) -> Result<Self, Error> {
        let conn = redis_client.get_async_connection().await;

        match conn {
            Ok(conn) => Ok(Self {
                redis_connection: Arc::new(conn),
            }),
            Err(e) => Err(RedisCacheError(e.to_string())),
        }
    }
}
