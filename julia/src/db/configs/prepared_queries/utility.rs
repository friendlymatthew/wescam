use async_trait::async_trait;
use scylla::Session;
use std::error::Error;
use std::sync::Arc;

#[async_trait]
pub trait PreparedQueries: Sized {
    async fn new(session: Arc<Session>) -> Result<Self, Box<dyn Error>>;
}

pub async fn wrap_prepared_queries<T: PreparedQueries>(
    session: Arc<Session>,
) -> Result<Arc<T>, Box<dyn Error>> {
    let prepared_queries = T::new(session).await?;
    Ok(Arc::new(prepared_queries))
}
