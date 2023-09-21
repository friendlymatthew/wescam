use crate::scylladb::configs::prepared_queries::utility::PreparedQueries;
use anyhow::Result;
use async_trait::async_trait;
use scylla::{prepared_statement::PreparedStatement, Session};
use std::error::Error;
use std::sync::Arc;
use tracing::info;

#[derive(Clone)]
pub struct EntityQueries {
    pub insert_user: PreparedStatement,
    pub get_user_by_guid: PreparedStatement,
    pub insert_rogue: PreparedStatement,
    pub delete_rogue: PreparedStatement,
    pub get_rogue_by_email: PreparedStatement,
}

#[async_trait]
impl PreparedQueries for EntityQueries {
    async fn new(session: Arc<Session>) -> Result<Self, Box<dyn Error>> {
        info!("Preparing entity queries");

        let insert_user = session
            .prepare("INSERT INTO julia.users (guid, name, email, class_year, pronouns) VALUES (?, ?, ?, ?, ?)")
            .await?;
        info!("Insert user query set");

        let get_user_by_guid = session
            .prepare("SELECT * FROM julia.users WHERE guid = ?")
            .await?;
        info!("Get user by guid set");

        let insert_rogue = session
            .prepare("INSERT INTO julia.rogues (guid, email) VALUES (?, ?)")
            .await?;
        info!("Insert rogue query set");

        let get_rogue_by_email = session
            .prepare("SELECT * FROM julia.rogues WHERE email = ?")
            .await?;
        info!("Get rogue user by email query set");

        let delete_rogue = session
            .prepare("DELETE FROM julia.rogues WHERE email = ?")
            .await?;
        info!("Delete rogue user query set");

        Ok(EntityQueries {
            insert_user,
            get_user_by_guid,
            insert_rogue,
            get_rogue_by_email,
            delete_rogue,
        })
    }
}
