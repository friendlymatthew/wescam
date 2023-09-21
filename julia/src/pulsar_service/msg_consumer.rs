use pulsar::{Consumer, Error as PulsarError, DeserializeMessage, Payload, Pulsar, TokioExecutor, SubType};
use crate::pulsar_service::msg_producer::MessageProducer;
use crate::scylladb::datatype::message_type::Message as MessageDto;

impl DeserializeMessage for MessageDto {
    type Output = Result<MessageDto, serde_json::Error>;

    fn deserialize_message(payload: &Payload) -> Self::Output {
        serde_json::from_slice(&payload.data)
    }
}

pub struct MessageConsumer {
    pulsar_client: Pulsar<TokioExecutor>,
}

impl MessageConsumer {
    async fn new(&self) -> Result<Consumer<MessageDto, TokioExecutor>, PulsarError> {
        let consumer = self.pulsar_client
            .consumer()
            .with_topic("message-bond-{guid}")
            .with_consumer_name("miguel, test- consumer")
            .with_subscription_type(SubType::Exclusive)
            .with_subscription("test_subscription")
            .build()
            .await?;

        Ok(consumer)
    }
}