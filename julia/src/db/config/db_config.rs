use scylla::transport::errors::NewSessionError;
use scylla::{Session, SessionBuilder};
use tracing::info;

pub async fn initialize(uri_key: &str) -> Result<Session, NewSessionError> {
    info!("Connecting to ScyllaDB at URI: {}", uri_key);

    let uri = std::env::var(uri_key).unwrap_or_else(|_| {
        info!("Env not found, scylla uri defaulted");
        "127.0.0.1:9042".to_string()
    });

    info!("ScyllaDB session built successfully");
    SessionBuilder::new().known_node(uri).build().await
}
