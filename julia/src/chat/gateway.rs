use crate::chat::gateway_utility::{WsPayload, WsTopic};
use crate::scylladb::service::service_errors::Error;
use futures::StreamExt;
use pulsar::{producer, Producer, Pulsar, TokioExecutor};
use std::sync::Arc;
use tokio::sync::mpsc;
use tokio_stream::wrappers::UnboundedReceiverStream;
use tracing::warn;
use warp::ws::WebSocket;

pub type ProducerRef = Arc<Producer<TokioExecutor>>;

#[derive(Clone)]
pub struct ChatGateway {
    pub msg_producer: Arc<Producer<TokioExecutor>>,
    pub presence_producer: Arc<Producer<TokioExecutor>>,
}

pub async fn user_connected(
    msg_producer: Arc<Producer<TokioExecutor>>,
    presence_producer: Arc<Producer<TokioExecutor>>,
    mut ws: WebSocket,
    user_guid: String,
) {
    while let Some(result) = ws.next().await {
        match result {
            Ok(message) => {
                if message.is_text() {
                    if let Ok(text) = message.to_str() {
                        let chat_msg: Result<WsPayload, _> = serde_json::from_str(text);

                        match chat_msg {
                            Ok(payload) => match payload.topic_type {
                                WsTopic::JOIN_ROOM => {}
                                WsTopic::SEND_MESSAGE => {}
                                WsTopic::LEAVE_ROOM => {}
                            },
                            Err(e) => {
                                // handle serde deserialization error here
                            }
                        }
                    }
                }
            }
            Err(_) => {
                // handle websocket read error
            }
        }
    }

    // user has disconnected
}

pub async fn create_gateway(
    pulsar_service: Arc<Pulsar<TokioExecutor>>,
) -> Result<ChatGateway, Error> {
    let msg_producer = pulsar_service
        .producer()
        .with_topic("persistent://public/default/bondmessage")
        .with_name("Chat gateway msg-topic producer")
        .with_options(producer::ProducerOptions {
            ..Default::default()
        })
        .build()
        .await?;

    let presence_producer = pulsar_service
        .producer()
        .with_topic("persistent://public/default/userpresence")
        .with_name("User presence topic producer")
        .with_options(producer::ProducerOptions {
            ..Default::default()
        })
        .build()
        .await?;

    Ok(ChatGateway {
        msg_producer: Arc::new(msg_producer),
        presence_producer: Arc::new(presence_producer),
    })
}
