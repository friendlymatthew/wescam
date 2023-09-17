use crate::datatype::bond_type::{Bond, CreateBondInput};
use crate::db::configs::prepared_queries::bond_queries::BondQueries;
use anyhow::Result;
use chrono::{DateTime, Utc};
use scylla::{IntoTypedRows, Session};
use std::sync::Arc;
use uuid::Uuid;

async fn check_existing_bond(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
    creator_id: String,
    crush_id: String,
) -> Result<Option<Bond>> {
    let bond_id = crush_id.to_string() + &creator_id.to_string();

    let result = session
        .execute(&prepared_queries.check_existing_bond, (bond_id,))
        .await?;

    if let Some(rows) = result.rows {
        for row in rows.into_typed::<(String, String, String, i32, i32, String, String)>() {
            let (id, creator_id, crush_id, bond_type, game_status, created_at, updated_at) = row?;
            return Ok(Some(Bond {
                id,
                creator_id,
                crush_id,
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
    bond_input: CreateBondInput,
) -> Result<Bond> {
    let existing_bond = check_existing_bond(
        session.clone(),
        prepared_queries.clone(),
        bond_input.creator_id.clone(),
        bond_input.crush_id.clone(),
    )
    .await?;

    let updated_at: DateTime<Utc> = Utc::now();

    let return_bond: Bond;

    if let Some(mut existing_bond) = existing_bond {
        session
            .execute(
                &prepared_queries.update_bond,
                (1, updated_at.to_string(), existing_bond.id.clone()),
            )
            .await?;

        existing_bond.game_status = 1;
        existing_bond.updated_at = updated_at.to_string();

        return_bond = existing_bond;
    } else {
        let bond_id = Uuid::new_v4();
        let created_at: DateTime<Utc> = Utc::now();
        session
            .execute(
                &prepared_queries.form_bond,
                (
                    bond_id.to_string(),
                    bond_input.creator_id.clone(),
                    bond_input.crush_id.clone(),
                    bond_input.bond_type,
                    bond_input.game_status,
                    created_at.to_string(),
                    updated_at.to_string(),
                ),
            )
            .await?;

        return_bond = Bond {
            id: bond_id.to_string(),
            creator_id: bond_input.creator_id,
            crush_id: bond_input.crush_id,
            bond_type: bond_input.bond_type,
            game_status: bond_input.game_status,
            created_at: created_at.to_string(),
            updated_at: updated_at.to_string(),
        };
    }

    return Ok(return_bond);
}

pub async fn get_bonds_by_user_id(
    session: Arc<Session>,
    prepared_queries: Arc<BondQueries>,
    user_id: String,
) -> Result<Vec<Bond>> {
    let creator_result = session
        .execute(
            &prepared_queries.fetch_user_creator_bonds,
            (user_id.clone(),),
        )
        .await?;

    let mut bonds: Vec<Bond> = Vec::new();

    if let Some(rows) = creator_result.rows {
        for row in rows.into_typed::<(String, String, String, i32, i32, String, String)>() {
            let (id, creator_id, crush_id, bond_type, game_status, created_at, updated_at) = row?;

            let bond = Bond {
                id,
                creator_id,
                crush_id,
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
