use scylla::{Session, IntoTypedRows };
use snowflake::ProcessUniqueId;
use anyhow::{Result, anyhow};
use std::sync::Arc;

use crate::datatype::entity_type::{CreateUserInput, User, CreateRogueInput, Rogue};

pub async fn create_user(session: Arc<Session>, user_input: CreateUserInput) -> Result<()> {
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

pub async fn get_user_by_id(session: Arc<Session>, id: String) -> Result<User> {
    let cql_query = "SELECT * FROM julia.users WHERE id = ?";

    let result = session.query(cql_query, (id,)).await?;

    if let Some(rows) = result.rows {
        for row in rows.into_typed::<(String, String, String, String, String)>() {
            let (id, name, email, class_year, pronouns) = row?;

            // Construct a User object from the obtained values
            return Ok(User {
                id,
                name,
                email,
                class_year,
                pronouns
            });
        }
    }

    Err(anyhow!("No user found with the given ID"))
}

pub async fn create_rogue(session: Arc<Session>, rogue_input: CreateRogueInput) -> Result<()> {
    let user_id = ProcessUniqueId::new();

    let cql_query = format!(
        "INSERT INTO julia.rogues (id, email) VALUES (?, ?)"
    );

    session
        .query(
            cql_query,
            (user_id.to_string(), rogue_input.email)
        )
        .await?;

    Ok(())
}

pub async fn get_rogue_by_email(session: Arc<Session>, email: String) -> Result<Rogue> {
    let cql_query = "SELECT * FROM julia.rogues WHERE email = ?";

    let result = session.query(cql_query, (email,)).await?;

    if let Some(rows) = result.rows {
        for row in rows.into_typed::<(String, String)>() {
            let (id, email) = row?;

            // Construct a Rogue object from the obtained values
            return Ok(Rogue {
                id,
                email
            });
        }
    }

    Err(anyhow!("No rogue found with the given ID"))
}
