use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Deserialize, Serialize)]
pub struct CreateBondInput {
    pub creator_guid: Uuid,
    pub crush_guid: Uuid,

    pub bond_type: i32,   // 0 - dormant, 1 - active
    pub game_status: i32, // 0 - guess, 1 - match
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Bond {
    pub guid: String,
    pub creator_guid: Uuid,
    pub crush_guid: Uuid,
    pub bond_type: i32,
    pub game_status: i32,

    pub created_at: String,
    pub updated_at: String,
}
