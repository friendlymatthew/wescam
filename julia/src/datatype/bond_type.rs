use serde::{Deserialize, Serialize};

use chrono::{self, DateTime, Utc};


/*
We use this type to indicate if a crush is a rogue or legit User
When we fetch for all user bonds, we return all active
*/
#[derive(Debug, Deserialize, Serialize)]
pub enum BondType {
    ACTIVE,
    DORMANT
}


#[derive(Debug, Deserialize, Serialize)]
pub enum GameStatus {
    MATCH,
    GUESS
}

#[derive(Debug, Deserialize, Serialize)]
pub struct CreateBondInput {
    pub creator_id: String,
    pub crush_id: String,

    pub bond_type: BondType,
    pub game_status: GameStatus,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Bond {
    pub id: String,
    pub creator_id: String,
    pub crush_id: String,
    pub bond_type: BondType,
    pub game_status: GameStatus,

    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}