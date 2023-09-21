use crate::scylladb::datatype::bond_type::{Bond, CreateBondInput};
use crate::scylladb::configs::prepared_queries::bond_queries::BondQueries;
use chrono::{DateTime, Utc};
use scylla::{IntoTypedRows, Session};
use std::sync::Arc;
use pulsar::{producer, Pulsar, TokioExecutor};
use scylla::batch::Batch;
use uuid::Uuid;
use crate::pulsar_service::pulsar_producer::PulsarProducer;
use crate::scylladb::service::service_errors::Error;

async fn check_existing_bond(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
    creator_guid: Uuid,
    crush_guid: Uuid,
) -> Result<Option<Bond>, Error> {
    let bond_guid = format!(
        "{}{}",
        crush_guid.to_string(),
        creator_guid.to_string(),
    );

    let result = session
        .execute(&prepared_queries.check_existing_bond, (bond_guid,))
        .await?;

    if let Some(rows) = result.rows {
        for row in rows.into_typed::<(String, Uuid, Uuid, i32, i32, String, String)>() {
            let (guid, creator_guid, crush_guid, bond_type, game_status, created_at, updated_at) = row?;
            return Ok(Some(Bond {
                guid,
                creator_guid,
                crush_guid,
                bond_type,
                game_status,
                created_at,
                updated_at,
            }));
        }
    }

    Ok(None)
}

pub async fn form_bond(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
    pulsar_service: Arc<Pulsar<TokioExecutor>>,
    bond_input: CreateBondInput,
) -> Result<Bond, Error> {
    let existing_bond = check_existing_bond(
        session.clone(),
        prepared_queries.clone(),
        bond_input.creator_guid.clone(),
        bond_input.crush_guid.clone(),
    )
    .await?;

    let updated_at: DateTime<Utc> = Utc::now();

    let return_bond: Bond;

    if let Some(mut existing_bond) = existing_bond {
        let mut producer = pulsar_service
            .producer()
            .with_topic("persistent://public/default/mutualbonds")
            .with_options(producer::ProducerOptions {
                ..Default::default()
            })
            .build()
            .await?;


        let mut batch: Batch = Batch::default();

        batch.append_statement(prepared_queries.update_bond.clone());
        let batch_value =  (
            (
                1,
                updated_at.to_string(),
                existing_bond.guid.clone()
            ),
        );

        session.batch(&batch, batch_value).await?;

        existing_bond.game_status = 1;
        existing_bond.updated_at = updated_at.to_string();

        producer
            .send(existing_bond.clone()).await?.await.unwrap();

        return_bond = existing_bond.clone();
    } else {
        let bond_guid = format!(
            "{}{}",
            bond_input.creator_guid.to_string(),
            bond_input.crush_guid.to_string(),
        );

        let created_at: DateTime<Utc> = Utc::now();
        session
            .execute(
                &prepared_queries.form_bond,
                (
                    bond_guid.to_string(),
                    bond_input.creator_guid.clone(),
                    bond_input.crush_guid.clone(),
                    bond_input.bond_type,
                    bond_input.game_status,
                    created_at.to_string(),
                    updated_at.to_string(),
                ),
            )
            .await?;

        return_bond = Bond {
            guid: bond_guid,
            creator_guid: bond_input.creator_guid,
            crush_guid: bond_input.crush_guid,
            bond_type: bond_input.bond_type,
            game_status: bond_input.game_status,
            created_at: created_at.to_string(),
            updated_at: updated_at.to_string(),
        };
    }

    return Ok(return_bond);
}

pub async fn get_bonds_by_user_guid(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
    user_guid: Uuid,
) -> Result<Vec<Bond>, Error> {
    let creator_result = session
        .execute(
            &prepared_queries.fetch_user_creator_bonds,
            (user_guid.clone(),),
        )
        .await?;

    let mut bonds: Vec<Bond> = Vec::new();

    if let Some(rows) = creator_result.rows {
        for row in rows.into_typed::<(String, Uuid, Uuid, i32, i32, String, String)>() {
            let (guid, creator_guid, crush_guid, bond_type, game_status, created_at, updated_at) = row?;

            let bond = Bond {
                guid,
                creator_guid,
                crush_guid,
                bond_type,
                game_status,
                created_at,
                updated_at,
            };

            bonds.push(bond);
        }
    }

    // TODO! refactor to handle both queries

    Ok(bonds)
}
