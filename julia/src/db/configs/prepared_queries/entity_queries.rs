use anyhow::Result;
use scylla::{prepared_statement::PreparedStatement, Session};
use std::sync::Arc;
use tracing::info;

pub struct EntityQueries {
    pub insert_user: PreparedStatement,
    pub get_user_by_id: PreparedStatement,
    pub insert_rogue: PreparedStatement,
    pub delete_rogue: PreparedStatement,
    pub get_rogue_by_email: PreparedStatement,
}

impl EntityQueries {
    pub async fn new(session: Arc<Session>) -> Result<Self> {
        info!("Preparing entity queries");

        let insert_user = session
            .prepare("INSERT INTO julia.users (id, name, email, class_year, pronouns) VALUES (?, ?, ?, ?, ?)")
            .await?;
        info!("Insert user query set");

        let get_user_by_id = session
            .prepare("SELECT * FROM julia.users WHERE id = ?")
            .await?;
        info!("Get user by id set");

        let insert_rogue = session
            .prepare("INSERT INTO julia.rogues (id, email) VALUES (?, ?)")
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

        Ok(Self {
            insert_user,
            get_user_by_id,
            insert_rogue,
            get_rogue_by_email,
            delete_rogue,
        })
    }
}
