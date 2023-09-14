use scylla::{Session, IntoTypedRows };
use snowflake::ProcessUniqueId;
use anyhow::{Result, anyhow};
use std::sync::Arc;
use crate::datatype::entity_type::{CreateUserInput, User, CreateRogueInput, Rogue};
use crate::db::configs::prepare_entity_query::PreparedEntityQueries;

pub async fn create_user(
    session: Arc<Session>,
    prepared_queries: Arc<PreparedEntityQueries>,
    user_input: CreateUserInput) -> Result<User> {
    let rogue_check_result = get_rogue_by_email(session.clone(),prepared_queries.clone(), user_input.email.clone()).await;

    let (user_id, rogue_used) = match rogue_check_result {
        Ok(rogue) => {
            (rogue.id, true)
        },
        Err(_) => {
            (ProcessUniqueId::new().to_string(), false)
        }
    };



    session
        .execute(
            &prepared_queries.insert_user,
            (user_id.clone(), user_input.name.clone(), user_input.email.clone(), user_input.pronouns.clone(), user_input.class_year.clone())
        )
        .await?;

    if rogue_used {
        session.execute(&prepared_queries.delete_rogue, (user_id.clone(),)).await?;
    }


    Ok(User {
        id: user_id,
        name: user_input.name,
        email: user_input.email,
        pronouns: user_input.pronouns,
        class_year: user_input.class_year,
    })
}

pub async fn get_user_by_id(
    session: Arc<Session>,
    prepared_queries: Arc<PreparedEntityQueries>,
    id: String
) -> Result<User> {

    let result = session.execute(&prepared_queries.get_user_by_id, (id,)).await?;

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

pub async fn create_rogue(
    session: Arc<Session>,
    prepared_queries: Arc<PreparedEntityQueries>,
    rogue_input: CreateRogueInput) -> Result<()> {
    let user_id = ProcessUniqueId::new();

    session
        .execute(
            &prepared_queries.insert_rogue,
            (user_id.to_string(), rogue_input.email)
        )
        .await?;

    Ok(())
}

pub async fn get_rogue_by_email(
    session: Arc<Session>,
    prepared_queries: Arc<PreparedEntityQueries>,
    email: String
) -> Result<Rogue> {

    let result = session.execute(&prepared_queries.get_rogue_by_email, (email,)).await?;

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
