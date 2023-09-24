use std::collections::HashMap;
use std::sync::Arc;
use uuid::Uuid;
use warp::Filter;
use crate::chat::gateway::{ChatGateway, user_connected};
use crate::WsMapping;

pub fn configure_ws_route(
    ws_map: WsMapping,
    chat_gateway: Arc<ChatGateway>,
) ->  impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {

    warp::path("chat")
        .and(warp::ws())
        .and(warp::query::<HashMap<String, String>>())
        .map({
            move |ws: warp::ws::Ws, query_map: HashMap<String, String>| {
                let user_guid = query_map
                    .get("guid")
                    .cloned()
                    .unwrap_or_else(|| "".to_string());

                let user_guid = Uuid::parse_str(&user_guid).unwrap();

                let socket_guid = Uuid::new_v4();

                let ws_map = ws_map.clone();
                ws.on_upgrade({
                    let ws_map = ws_map.clone();
                    let msg_producer = chat_gateway.msg_producer.clone();
                    let presence_producer = chat_gateway.presence_producer.clone();

                    move |socket| {
                        let ws_map = ws_map.clone();
                        let user_guid = user_guid.clone();
                        async move {
                            ws_map.insert(socket_guid, tokio::sync::Mutex::new(socket));
                            let user_connected_fut = user_connected(
                                msg_producer,
                                presence_producer,
                                ws_map.clone(),
                                user_guid,
                                socket_guid,
                            );
                            let handle = tokio::spawn(user_connected_fut);
                            if let Err(e) = handle.await {
                                println!("Failed to execute user_connected: {}", e);
                            }

                            ws_map.remove(&user_guid);
                        }
                    }
                })
            }
        })
}