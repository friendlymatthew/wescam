


use pulsar::{Pulsar, producer, producer::Producer, TokioExecutor, Error as PulsarError, SerializeMessage, };
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

pub struct MessageProducer {
    pulsar_client: Pulsar<TokioExecutor>,
}

impl MessageProducer {
    async fn new(&self) -> Result<Producer<TokioExecutor>, PulsarError> {
        let producer = self.pulsar_client
            .producer()
            .with_topic("persistent://public/default/message-bond-{guid}")
            .with_name("miguel, msg producer")
            .with_options(producer::ProducerOptions {
                ..Default::default()
            })
            .build()
            .await?;

        Ok(producer)
    }
}