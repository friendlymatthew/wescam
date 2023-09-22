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

        let mut insert_user = session
            .prepare("INSERT INTO julia.users (guid, name, email, class_year, pronouns) VALUES (?, ?, ?, ?, ?)")
            .await?;
        insert_user.set_tracing(true);
        info!("Insert user query set");

        let mut get_user_by_guid = session
            .prepare("SELECT * FROM julia.users WHERE guid = ?")
            .await?;
        get_user_by_guid.set_tracing(true);
        info!("Get user by guid set");

        let mut insert_rogue = session
            .prepare("INSERT INTO julia.rogues (guid, email) VALUES (?, ?)")
            .await?;
        insert_rogue.set_tracing(true);
        info!("Insert rogue query set");

        let mut get_rogue_by_email = session
            .prepare("SELECT * FROM julia.rogues WHERE email = ?")
            .await?;
        get_rogue_by_email.set_tracing(true);
        info!("Get rogue user by email query set");

        let mut delete_rogue = session
            .prepare("DELETE FROM julia.rogues WHERE email = ?")
            .await?;
        delete_rogue.set_tracing(true);
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
