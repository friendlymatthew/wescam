use scylla::{Session, IntoTypedRows};
use anyhow::Result;
use chrono::{DateTime, Utc};
use std::sync::Arc;
use snowflake::ProcessUniqueId;
use crate::datatype::bond_type::{CreateBondInput, Bond};
use crate::db::configs::prepare_bond_queries::PreparedBondQueries;
async fn check_existing_bond(session: Arc<Session>, creator_id: String, crush_id: String, prepared_queries: Arc<PreparedBondQueries>) -> Result<Option<Bond>> {



    let result = session.execute (
        &prepared_queries.get_bonds_by_user_id,
        (crush_id.clone(), creator_id.clone())
    ).await?;

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
    prepared_queries: Arc<PreparedBondQueries>,
    bond_input: CreateBondInput
) -> Result<Bond> {
    let existing_bond = check_existing_bond(session.clone(), bond_input.creator_id.clone(), bond_input.crush_id.clone(), prepared_queries.clone()).await?;

    let updated_at: DateTime<Utc> = Utc::now();

    let return_bond: Bond;

    if let Some(mut existing_bond) = existing_bond {
        session.execute(
            &prepared_queries.update_bond,
            (
                1,
                updated_at.to_string(),
                existing_bond.id.clone(),
            )
        ).await?;

        existing_bond.game_status = 1;
        existing_bond.updated_at = updated_at.to_string();

        return_bond = existing_bond;
    } else {
        let bond_id = ProcessUniqueId::new();
        let created_at: DateTime<Utc> = Utc::now();
        session.execute(
            &prepared_queries.insert_bond,
            (
                bond_id.to_string(),
                bond_input.creator_id.clone(),
                bond_input.crush_id.clone(),
                bond_input.bond_type,
                bond_input.game_status,
                created_at.to_string(),
                updated_at.to_string(),
            )
        ).await?;

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

    return Ok(return_bond)
}

pub async fn get_bonds_by_user_id(session: Arc<Session>, prepared_queries: Arc<PreparedBondQueries>, user_id: String) -> Result<Vec<Bond>> {
    let result = session.execute(&prepared_queries.get_bonds_by_user_id, (user_id.clone(), user_id.clone() )).await?;

    let mut bonds: Vec<Bond> = Vec::new();

    if let Some(rows) = result.rows {
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

    Ok(bonds)
}