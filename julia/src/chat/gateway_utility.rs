use crate::scylladb::datatype::message_type::Message;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize)]
pub enum WsTopic {
    JOIN_ROOM,
    LEAVE_ROOM,
    SEND_MESSAGE,
}

#[derive(Serialize, Deserialize)]
pub struct WsPayload {
    pub topic_type: WsTopic,
    pub bond_guid: Uuid,
    pub message: Option<Message>,
}
