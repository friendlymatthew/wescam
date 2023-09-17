use serde::{Deserialize, Serialize};
#[derive(Debug, Deserialize, Serialize)]
pub struct CreateBondInput {
    pub creator_id: String,
    pub crush_id: String,

    pub bond_type: i32,   // 0 - dormant, 1 - active
    pub game_status: i32, // 0 - guess, 1 - match
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Bond {
    pub id: String,
    pub creator_id: String,
    pub crush_id: String,
    pub bond_type: i32,
    pub game_status: i32,

    pub created_at: String,
    pub updated_at: String,
}
