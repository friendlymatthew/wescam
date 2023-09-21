use std::sync::Arc;
use pulsar::{Pulsar, producer, producer::Producer, TokioExecutor, Error as PulsarError, SerializeMessage, };
use pulsar::producer::Message;
use crate::scylladb::datatype::bond_type::Bond;
use crate::scylladb::datatype::message_type::Message as MessageDto;
impl SerializeMessage for MessageDto {
    fn serialize_message(input: Self) -> Result<producer::Message, PulsarError> {
        let payload = serde_json::to_vec(&input)
            .map_err(|e| PulsarError::Custom(e.to_string()))?;
        Ok(producer::Message {
            payload,
            ..Default::default()
        })
    }
}

impl SerializeMessage for Bond {
    fn serialize_message(input: Self) -> Result<Message, PulsarError> {
        let payload = serde_json::to_vec(&input).map_err(|e| PulsarError::Custom(e.to_string()))?;

        Ok(producer::Message {
            payload,
            ..Default::default()
        })

    }
}

#[derive(Clone)]
pub struct PulsarProducer {
}

impl PulsarProducer {
    pub async fn new(name: String, pulsar_service: Arc<Pulsar<TokioExecutor>>, topic: String) -> Result<Producer<TokioExecutor>, PulsarError> {
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