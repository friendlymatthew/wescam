use crate::scylladb::configs::prepared_queries::entity_queries::EntityQueries;
use scylla::{batch::Batch, IntoTypedRows, Session};
use std::sync::Arc;
use uuid::Uuid;
use crate::scylladb::datatype::entity_type::{CreateUserInput, User, Rogue, CreateRogueInput};
use crate::scylladb::service::service_errors::Error;
use crate::scylladb::service::service_errors::Error::NotFound;

pub async fn create_user(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    user_input: CreateUserInput,
) -> Result<User, Error>{
    let rogue_check_result = get_rogue_by_email(
        session.clone(),
        prepared_queries.clone(),
        user_input.email.clone(),
    )
    .await;

    let (user_guid, rogue_used) = match rogue_check_result {
        Ok(rogue) => (rogue.guid, true),
        Err(_) => (Uuid::new_v4(), false),
    };

    if rogue_used {
        let mut batch = Batch::default();

        batch.append_statement(prepared_queries.insert_user.clone());
        batch.append_statement(prepared_queries.delete_rogue.clone());

        let batch_values = (
            (
                user_guid.clone(),
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
                    user_guid.clone(),
                    user_input.name.clone(),
                    user_input.email.clone(),
                    user_input.pronouns.clone(),
                    user_input.class_year.clone(),
                ),
            )
            .await?;
    }

    Ok(User {
        guid: user_guid,
        name: user_input.name,
        email: user_input.email,
        pronouns: user_input.pronouns,
        class_year: user_input.class_year,
    })
}

pub async fn get_user_by_guid(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    guid: Uuid,
) -> Result<User, Error> {
    let result = session
        .execute(&prepared_queries.get_user_by_guid, (guid,))
        .await?;

    if let Some(rows) = result.rows {
        for row in rows.into_typed::<(Uuid, String, String, String, String)>() {
            let (guid, name, email, class_year, pronouns) = row?;

            return Ok(User {
                guid,
                name,
                email,
                class_year,
                pronouns,
            });
        }
    }

    Err(NotFound)
}

pub async fn create_rogue(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    rogue_input: CreateRogueInput,
) -> Result<Rogue, Error> {
    let rogue_guid = Uuid::new_v4();

    session
        .execute(
            &prepared_queries.insert_rogue,
            (rogue_guid.to_string(), rogue_input.email.clone()),
        )
        .await?;

    Ok(Rogue {
        email: rogue_input.email.clone(),
        guid: rogue_guid.clone(),
    })
}

pub async fn get_rogue_by_email(
    session: Arc<Session>,
    prepared_queries: Arc<EntityQueries>,
    email: String,
) -> Result<Rogue, Error> {
    let result = session
        .execute(&prepared_queries.get_rogue_by_email, (email,))
        .await?;

    if let Some(rows) = result.rows {
        for row in rows.into_typed::<(String, Uuid)>() {
            let (email, guid) = row?;

            return Ok(Rogue { email, guid });
        }
    }

    Err(NotFound)
}
