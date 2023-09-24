use crate::chat::forwarder::Presence;
use crate::chat::forwarder::Status;
use crate::chat::gateway_utility::{WsPayload, WsTopic};
use crate::pulsar_service::pulsar_producer::{DataPayload, PulsarProducer, TopicPayload};
use crate::scylladb::service::service_errors::Error;
use crate::WsMapping;
use futures::{StreamExt};
use pulsar::{producer, Producer, Pulsar, TokioExecutor};
use std::sync::{Arc};
use tokio::sync::Mutex;
use uuid::Uuid;

pub type ProducerRef = Arc<Mutex<Producer<TokioExecutor>>>;

#[derive(Clone)]
pub struct ChatGateway {
    pub msg_producer: ProducerRef,
    pub presence_producer: ProducerRef,
}

pub async fn user_connected(
    msg_producer: ProducerRef,
    presence_producer: ProducerRef,
    mut ws_map: WsMapping,
    user_guid: Uuid,
    socket_guid: Uuid,
) -> Result<(), Error>{
    let presence_info = Presence {
        user_guid,
        socket_guid,
        status: Status::CONNECT,
    };

    let topic_payload = serde_json::to_vec(&TopicPayload {
        msg: format!("User {} connected", &user_guid),
        data: DataPayload::Presence(presence_info),
    }).map_err(|_| Error::SerializationError)?;
    let mut presence_producer = presence_producer.lock().await;

    presence_producer.send(topic_payload).await.map_err(Error::from)?;

    if let Some(ws_mutex) = ws_map.get(&user_guid) {
        let mut ws = ws_mutex.lock().await;
        while let Some(result) = ws.next().await {
            match result {
                Ok(message) => {
                    if message.is_text() {
                        if let Ok(text) = message.to_str() {
                            let chat_msg: Result<WsPayload, _> = serde_json::from_str(text);

                            match chat_msg {
                                Ok(payload) => match payload.topic_type {
                                    WsTopic::JoinRoom => {}
                                    WsTopic::SendMessage => {
                                        if let Some(msg) = payload.message {
                                            let flat_data = serde_json::json!({
                                                "guid": msg.guid,
                                                "bond_guid": msg.bond_guid,
                                                "sender_guid": msg.sender_guid,
                                                "recipient_guid": msg.recipient_guid,
                                                "content": msg.content,
                                                "status": msg.status,
                                            });

                                            let serialized_data = serde_json::to_vec(&flat_data)
                                                .expect("Failed to serialize data payload");

                                            let mut msg_producer = msg_producer.lock().await;

                                            msg_producer
                                                .send(producer::Message {
                                                    payload: serialized_data,
                                                    partition_key: Some(msg.bond_guid.to_string()),
                                                    ..Default::default()
                                                })
                                                .await.map_err(Error::from)?;
                                        }
                                    }
                                    WsTopic::LeaveRoom => {}
                                },
                                Err(_) => {
                                    return Err(Error::WsError);
                                }
                            }
                        }
                    }
                }
                Err(_) => {
                    return Err(Error::SerializationError);
                }
            }
        }
    }

    let presence_info = Presence {
        user_guid,
        socket_guid,
        status: Status::LEAVE,
    };

    let topic_payload = serde_json::to_vec(&TopicPayload {
        msg: format!("User {} disconnected", &user_guid),
        data: DataPayload::Presence(presence_info),
    }).map_err(|_| Error::SerializationError)?;

    presence_producer.send(topic_payload).await.map_err(Error::from)?;

    Ok(())
}

pub async fn create_gateway(
    pulsar_service: Arc<Pulsar<TokioExecutor>>,
) -> Result<ChatGateway, Error> {
    let msg_producer = PulsarProducer::new(
        format!("Chat gateway msg-topic producer"),
        pulsar_service.clone(),
        format!("persistent://public://public/default/bondmessage"),
    )
    .await?;

    let presence_producer = PulsarProducer::new(
        format!("User presence topic producer"),
        pulsar_service.clone(),
        format!("persistent://public/default/userpresence"),
    )
    .await?;

    Ok(ChatGateway {
        msg_producer: Arc::new(Mutex::new(msg_producer)),
        presence_producer: Arc::new(Mutex::new(presence_producer)),
    })
}
