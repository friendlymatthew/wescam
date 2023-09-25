use crate::chat::forwarder::Presence;
use crate::scylladb::datatype::bond_type::Bond;
use crate::scylladb::datatype::message_type::Message;
use pulsar::{
    producer, producer::Producer, Error as PulsarError, Pulsar, SerializeMessage, TokioExecutor,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Serialize, Deserialize)]
pub enum DataPayload {
    Bond(Bond),
    Message(Message),
    Presence(Presence),
}

#[derive(Serialize, Deserialize)]
pub struct TopicPayload {
    pub msg: String,
    pub data: DataPayload,
}

impl SerializeMessage for TopicPayload {
    fn serialize_message(input: Self) -> Result<producer::Message, PulsarError> {
        let payload = serde_json::to_vec(&input).map_err(|e| PulsarError::Custom(e.to_string()))?;

        Ok(producer::Message {
            payload,
            ..Default::default()
        })
    }
}

#[derive(Clone)]
pub struct PulsarProducer {}

impl PulsarProducer {
    pub async fn new(
        name: String,
        pulsar_service: Arc<Pulsar<TokioExecutor>>,
        topic: String,
    ) -> Result<Producer<TokioExecutor>, PulsarError> {
        let producer = pulsar_service
            .producer()
            .with_topic(topic)
            .with_name(name)
            .with_options(producer::ProducerOptions {
                ..Default::default()
            })
            .build()
            .await?;

        Ok(producer)
    }
}
