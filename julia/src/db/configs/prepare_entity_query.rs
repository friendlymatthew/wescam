use scylla::{Session, prepared_statement::PreparedStatement};
use std::sync::Arc;
use anyhow::Result;

pub struct PreparedEntityQueries {
    pub insert_user: PreparedStatement,
    pub get_user_by_id: PreparedStatement,
    pub insert_rogue: PreparedStatement,
    pub delete_rogue: PreparedStatement,
    pub get_rogue_by_email: PreparedStatement,
}


impl PreparedEntityQueries {
    pub async fn new(session: Arc<Session>) -> Result<Self> {
        let insert_user = session
            .prepare("INSERT INTO julia.users (id, name, email, class_year, pronouns) VALUES (?, ?, ?, ?, ?)")
            .await?;

        let get_user_by_id = session
            .prepare("SELECT * FROM julia.users WHERE id = ?")
            .await?;

        let insert_rogue = session
            .prepare("INSERT INTO julia.rogues (id, email) VALUES (?, ?)")
            .await?;

        let get_rogue_by_email = session
            .prepare("SELECT * FROM julia.rogues WHERE email = ?")
            .await?;

        let delete_rogue = session
            .prepare("DELETE FROM julia.rogues WHERE id = ?")
            .await?;

        Ok(Self {
            insert_user,
            get_user_by_id,
            insert_rogue,
            get_rogue_by_email,
            delete_rogue,
        })
    }
}