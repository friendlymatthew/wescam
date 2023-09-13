use scylla::{Session};
use anyhow::Result;
use std::sync::Arc;

use crate::datatype::bond_type::{CreateBondInput, Bond, BondType, GameStatus};

pub async fn form_bond(session: &Arc<Session>, bond: CreateBondInput) -> Result<()> {
    Ok(())
}

pub async fn get_bonds_by_user_id(session: &Arc<Session>, user_id: String) -> Result<Vec<Bond>> {
    Ok(vec![])
}