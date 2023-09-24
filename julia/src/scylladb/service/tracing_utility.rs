use crate::scylladb::service::service_errors::Error;
use crate::scylladb::service::service_errors::Error::TracingError;
use scylla::tracing::TracingInfo;
use scylla::Session;
use std::sync::Arc;
use tracing::info;
use uuid::Uuid;

pub async fn handle_tracing(
    session: Arc<Session>,
    result_tracing_id: Option<Uuid>,
    tracing_name: String,
) -> Result<(), Error> {
    if let Some(guid) = result_tracing_id {
        let tracing_info: TracingInfo = session.get_tracing_info(&guid).await?;

        info!(
            "Tracing information for {}: {:#?}",
            tracing_name, tracing_info
        );

        return Ok(());
    }

    Err(TracingError)
}
