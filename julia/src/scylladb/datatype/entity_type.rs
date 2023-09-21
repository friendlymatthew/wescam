use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Deserialize, Serialize)]
pub struct CreateRogueInput {
    pub email: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Rogue {
    pub email: String,
    pub guid: Uuid,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct CreateUserInput {
    pub email: String,
    pub name: String,
    pub pronouns: String,
    pub class_year: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    pub guid: Uuid,
    pub email: String,
    pub name: String,
    pub pronouns: String,
    pub class_year: String,
}
