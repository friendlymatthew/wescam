use crate::db::configs::prepared_queries::utility::PreparedQueries;
use anyhow::Result;
use async_trait::async_trait;
use scylla::prepared_statement::PreparedStatement;
use scylla::Session;
use std::error::Error;
use std::sync::Arc;
use tracing::info;

#[derive(Clone)]
pub struct BondQueries {
    pub form_bond: PreparedStatement,
    pub check_existing_bond: PreparedStatement,
    pub fetch_user_creator_bonds: PreparedStatement,
    pub fetch_user_crush_bonds: PreparedStatement,
    pub delete_bond: PreparedStatement,
    pub update_bond: PreparedStatement,
}

#[async_trait]
impl PreparedQueries for BondQueries {
    async fn new(session: Arc<Session>) -> Result<Self, Box<dyn Error>> {
        info!("Preparing bond queries...");

        let form_bond = session
            .prepare("INSERT INTO julia.bonds (id, creator_id, crush_id, bond_type, game_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
            .await?;
        info!("Form bond query set");

        let check_existing_bond = session
            .prepare("SELECT * FROM julia.bonds WHERE id = ?")
            .await?;
        info!("Check existing bond query set");

        let fetch_user_creator_bonds = session
            .prepare("SELECT * FROM julia.bonds WHERE creator_id = ?")
            .await?;
        info!("Fetch user creator bond query set");

        let fetch_user_crush_bonds = session
            .prepare("SELECT * FROM julia.bonds WHERE crush_id = ?")
            .await?;
        info!("Fetch user crush bond query set");

        let delete_bond = session
            .prepare("DELETE FROM julia.bonds WHERE id = ?")
            .await?;
        info!("Delete bond query set");

        let update_bond = session
            .prepare("UPDATE julia.bonds SET game_status = ?, updated_at = ? WHERE id = ?")
            .await?;
        info!("Update bond query set");

        Ok(BondQueries {
            form_bond,
            check_existing_bond,
            fetch_user_creator_bonds,
            fetch_user_crush_bonds,
            delete_bond,
            update_bond,
        })
    }
}
