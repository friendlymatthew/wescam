use scylla::Session;
use std::error::Error;
use tracing::{error, info};

pub async fn create_tables(session: &Session) -> Result<(), Box<dyn Error>> {
    info!("Starting to create keyspaces and tables...");

    let config_queries = vec![
        "CREATE KEYSPACE IF NOT EXISTS julia WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };",

        "CREATE TABLE IF NOT EXISTS julia.rogues (id text PRIMARY KEY, email text);",
        "CREATE INDEX IF NOT EXISTS ON julia.rogues (email);",

        "CREATE TABLE IF NOT EXISTS julia.users (id text PRIMARY KEY, email text, name text, pronouns text, class_year text);",
        "CREATE TABLE IF NOT EXISTS julia.bonds (id text PRIMARY KEY, creator_id text, crush_id text, bond_type text, game_status text, created_at timestamp, updated_at timestamp);",
    ];

    for &query in config_queries.iter() {
        session.query(query, ()).await.map_err(|e| {
            error!("Failed to execute query '{}': {}", query, e);
            Box::new(e) as Box<dyn Error>
        })?;

        info!("Executed query: '{}'", query);
    }
    info!("Successfully created keyspaces and tables");
    Ok(())
}
