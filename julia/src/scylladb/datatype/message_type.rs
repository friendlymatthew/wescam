use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Message {
    pub guid: Uuid,
    pub bond_guid: Uuid,
    pub sender_guid: Uuid,
    pub recipient_guid: Uuid,

    pub content: String,
    pub status: MessageStatus,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum MessageStatus {
    ERROR,
    DELIVERED,
    SEEN,
}
