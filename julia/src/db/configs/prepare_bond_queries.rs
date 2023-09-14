use scylla::{Session, prepared_statement::PreparedStatement};
use std::sync::Arc;
use anyhow::Result;

pub struct PreparedBondQueries {
    pub insert_bond: PreparedStatement,
    pub get_bonds_by_user_id: PreparedStatement,
    pub check_existing_bond: PreparedStatement,
    pub update_bond: PreparedStatement,
}

impl PreparedBondQueries {
    pub async fn new(session: Arc<Session>) -> Result<Self> {
        let insert_bond = session
            .prepare("INSERT INTO julia.bonds (id, creator_id, crush_id, bond_type, game_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
            .await?;

        let get_bonds_by_user_id = session
            .prepare("SELECT * FROM julia.bonds WHERE creator_id = ? OR crush_id = ?")
            .await?;

        let check_existing_bond = session
            .prepare("SELECT * FROM julia.bonds WHERE (creator_id ? AND crush_id = ?)")
            .await?;

        let update_bond = session
            .prepare("UPDATE julia.bonds SET game_status = ?, updated_at = ? WHERE id = ?")
            .await?;

        Ok(Self {
            insert_bond,
            get_bonds_by_user_id,
            check_existing_bond,
            update_bond,
        })
    }
}