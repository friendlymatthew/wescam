use scylla::{Session};
use snowflake::ProcessUniqueId;
use anyhow::Result;
use std::sync::Arc;

use crate::datatype::user_type::{CreateUserInput, User, CreateRogueInput, Rogue};


pub async fn create_user(session: &Arc<Session>, user_input: CreateUserInput) -> Result<()> {
    let user_id = ProcessUniqueId::new();

    let cql_query = format!(
        "INSERT INTO julia.users (id, name, email, class_year, pronouns) VALUES (?, ?, ?, ?, ?)"
    );

    session
        .query(
            cql_query,
            (user_id.to_string(), user_input.name, user_input.email, user_input.pronouns, user_input.class_year)
        )
        .await?;

    Ok(())
}

pub async fn get_user_by_id(session: &Session, id: ProcessUniqueId) -> Result<()> {
    // TODO: implement
    Ok(())
}

pub async fn create_rogue(session: &Session, rogue: CreateRogueInput) -> Result<()> {
    // TODO: implement
    Ok(())
}

pub async fn get_rogue_by_email(session: &Session, email: String) -> Result<()> {
    // TODO: implement
    Ok(())
}
