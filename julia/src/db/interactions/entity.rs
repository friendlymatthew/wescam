use crate::datatype::entity_type::{CreateRogueInput, CreateUserInput, Rogue, User};
use crate::db::configs::prepared_queries::entity_queries::EntityQueries;
use anyhow::{anyhow, Result};
use scylla::{batch::Batch, IntoTypedRows, Session};
use std::sync::Arc;
use uuid::Uuid;

pub async fn create_user(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    user_input: CreateUserInput,
) -> Result<User, Box<dyn std::error::Error>> {
    let rogue_check_result = get_rogue_by_email(
        session.clone(),
        prepared_queries.clone(),
        user_input.email.clone(),
    )
    .await;

    let (user_id, rogue_used) = match rogue_check_result {
        Ok(rogue) => (rogue.id, true),
        Err(_) => (Uuid::new_v4().to_string(), false),
    };

    if rogue_used {
        let mut batch = Batch::default();

        batch.append_statement(prepared_queries.insert_user.clone());
        batch.append_statement(prepared_queries.delete_rogue.clone());

        let batch_values = (
            (
                user_id.clone(),
                user_input.name.clone(),
                user_input.email.clone(),
                user_input.pronouns.clone(),
                user_input.class_year.clone(),
            ),
            (user_input.email.clone(),),
        );

        session.batch(&batch, batch_values).await?;
    } else {
        session
            .execute(
                &prepared_queries.insert_user,
                (
                    user_id.clone(),
                    user_input.name.clone(),
                    user_input.email.clone(),
                    user_input.pronouns.clone(),
                    user_input.class_year.clone(),
                ),
            )
            .await?;
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
    prepared_queries: Arc<EntityQueries>,
    id: String,
) -> Result<User> {
    let result = session
        .execute(&prepared_queries.get_user_by_id, (id,))
        .await?;

    if let Some(rows) = result.rows {
        for row in rows.into_typed::<(String, String, String, String, String)>() {
            let (id, name, email, class_year, pronouns) = row?;

            return Ok(User {
                id,
                name,
                email,
                class_year,
                pronouns,
            });
        }
    }

    Err(anyhow!("No user found with the given ID"))
}

pub async fn create_rogue(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    rogue_input: CreateRogueInput,
) -> Result<Rogue> {
    let rogue_id = Uuid::new_v4();

    session
        .execute(
            &prepared_queries.insert_rogue,
            (rogue_id.to_string(), rogue_input.email.clone()),
        )
        .await?;

    Ok(Rogue {
        email: rogue_input.email.clone(),
        id: rogue_id.to_string(),
    })
}

pub async fn get_rogue_by_email(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    email: String,
) -> Result<Rogue> {
    let result = session
        .execute(&prepared_queries.get_rogue_by_email, (email,))
        .await?;

    if let Some(rows) = result.rows {
        for row in rows.into_typed::<(String, String)>() {
            let (email, id) = row?;

            return Ok(Rogue { email, id });
        }
    }

    Err(anyhow!("No rogue found with the given ID"))
}
