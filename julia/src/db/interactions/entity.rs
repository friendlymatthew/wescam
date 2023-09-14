use scylla::{Session, IntoTypedRows };
use snowflake::ProcessUniqueId;
use anyhow::{Result, anyhow};
use std::sync::Arc;
use tracing::{info, instrument};
use crate::datatype::entity_type::{CreateUserInput, User, CreateRogueInput, Rogue};

#[instrument]
pub async fn create_user(session: Arc<Session>, user_input: CreateUserInput) -> Result<User> {
    let rogue_check_result = get_rogue_by_email(session.clone(), user_input.email.clone()).await;

    let (user_id, rogue_used) = match rogue_check_result {
        Ok(rogue) => {
            (rogue.id, true)
        },
        Err(_) => {
            (ProcessUniqueId::new().to_string(), false)
        }
    };

    let cql_query = format!(
        "INSERT INTO julia.users (id, name, email, class_year, pronouns) VALUES (?, ?, ?, ?, ?)"
    );

    session
        .query(
            cql_query,
            (user_id.clone(), user_input.name.clone(), user_input.email.clone(), user_input.pronouns.clone(), user_input.class_year.clone())
        )
        .await?;

    if rogue_used {
        info!("rogue user existed so we will delete");
        let cql_delete_rogue_query = "DELETE FROM julia.rogues WHERE id = ?";
        session.query(cql_delete_rogue_query, (user_id.clone(),)).await?;
    }


    Ok(User {
        id: user_id,
        name: user_input.name,
        email: user_input.email,
        pronouns: user_input.pronouns,
        class_year: user_input.class_year,
    })
}

#[instrument]
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

#[instrument]
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

#[instrument]
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
