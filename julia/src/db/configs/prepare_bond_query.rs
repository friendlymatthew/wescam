use anyhow::Result;
use scylla::{prepared_statement::PreparedStatement, Session};
use std::sync::Arc;

pub struct PreparedBondQueries {
    pub form_bond: PreparedStatement,
    pub update_bond: PreparedStatement,
    pub get_user_bonds: PreparedStatement,
    pub check_existing_bond: PreparedStatement,
}

impl PreparedBondQueries {
    pub async fn new(session: Arc<Session>) -> Result<Self> {
        let form_bond = session
            .prepare("INSERT INTO julia.bonds (id, creator_id, crush_id, bond_type, game_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
            .await?;

        let update_bond = session
            .prepare("UPDATE julia.bonds SET game_status = ?, updated_at = ? WHERE id = ?")
            .await?;

        let get_user_bonds = session
            .prepare("SELECT * FROM julia.bonds WHERE creator_id = ? OR crush_id = ?")
            .await?;

        let check_existing_bond = session
            .prepare("SELECT * FROM julia.bonds WHERE (creator_id = ? AND crush_id = ?)")
            .await?;

        Ok(Self {
            form_bond,
            update_bond,
            get_user_bonds,
            check_existing_bond,
        })
    }
}
