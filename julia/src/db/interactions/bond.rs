use scylla::{Session, IntoTypedRows};
use anyhow::Result;
use chrono::{DateTime, Utc};
use std::sync::Arc;
use snowflake::ProcessUniqueId;
use crate::datatype::bond_type::{CreateBondInput, Bond};

async fn check_existing_bond(session: Arc<Session>, creator_id: String, crush_id: String) -> Result<Option<Bond>> {
    let check_cql_query = "SELECT * FROM julia.bonds WHERE (creator_id = ? AND crush_id = ?)";
    let result = session.query (
        check_cql_query,
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

pub async fn form_bond(session: Arc<Session>, bond_input: CreateBondInput) -> Result<Bond> {
    let existing_bond = check_existing_bond(session.clone(), bond_input.creator_id.clone(), bond_input.crush_id.clone()).await?;

    let updated_at: DateTime<Utc> = Utc::now();

    let return_bond: Bond;

    if let Some(mut existing_bond) = existing_bond {
        let update_cql_query = "UPDATE julia.bonds SET game_status = ?, updated_at = ? WHERE id = ?";
        session.query(
            update_cql_query,
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
        let insert_cql_query = "INSERT INTO julia.bonds (id, creator_id, crush_id, bond_type, game_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
        session.query(
            insert_cql_query,
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

pub async fn get_bonds_by_user_id(session: Arc<Session>, user_id: String) -> Result<Vec<Bond>> {
    let cql_query = "SELECT * FROM julia.bonds WHERE creator_id = ? OR crush_id = ?";
    let result = session.query(cql_query, (user_id.clone(), user_id.clone() )).await?;

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