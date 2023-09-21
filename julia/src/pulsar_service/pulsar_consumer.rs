use std::sync::Arc;
use pulsar::{Consumer, Error as PulsarError, DeserializeMessage, Payload, Pulsar, TokioExecutor, SubType};
use crate::scylladb::datatype::bond_type::Bond;
use crate::scylladb::datatype::message_type::Message as MessageDto;

impl DeserializeMessage for MessageDto {
    type Output = Result<MessageDto, serde_json::Error>;

    fn deserialize_message(payload: &Payload) -> Self::Output {
        serde_json::from_slice(&payload.data)
    }
}

impl DeserializeMessage for Bond {
    type Output = Result<Bond, serde_json::Error>;

    fn deserialize_message(payload: &Payload) -> Self::Output {
        serde_json::from_slice(&payload.data)
    }
}

pub struct PulsarConsumer {
}

impl PulsarConsumer {
    async fn new(name: String, pulsar_service: Arc<Pulsar<TokioExecutor>>, topic: String) -> Result<Consumer<MessageDto, TokioExecutor>, PulsarError> {
        let consumer = pulsar_service
            .consumer()
            .with_topic(topic)
            .with_consumer_name(name)
            .with_subscription_type(SubType::Exclusive)
            .with_subscription("test_subscription")
            .build()
            .await?;

        Ok(consumer)
    }
}