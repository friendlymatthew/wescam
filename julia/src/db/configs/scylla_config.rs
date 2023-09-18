use crate::db::configs::table_config;
use scylla::{Session, SessionBuilder};
use std::sync::Arc;
use tracing::info;

pub struct ScyllaConfig {
    pub session: Arc<Session>,
}

impl ScyllaConfig {
    pub async fn create_session(uri: String) -> Result<Self, Box<dyn std::error::Error>> {
        info!("Connecting to {}", uri);

        let session: Session = SessionBuilder::new().known_node(uri).build().await?;
        let session_arc = Arc::new(session);

        Ok(Self {
            session: session_arc,
        })
    }

    pub async fn populate_table(&self) -> Result<(), Box<dyn std::error::Error>> {
        table_config::drop(&self.session).await?;
        table_config::initialize(&self.session).await?;

        Ok(())
    }
}
