use scylla::Session;
use std::error::Error;
use tracing::info;

pub async fn initialize(session: &Session) -> Result<(), Box<dyn Error>> {
    let queries = vec![
        ("generate_keyspace", "CREATE KEYSPACE IF NOT EXISTS julia WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };"),
        ("generate_rogues", "CREATE TABLE IF NOT EXISTS julia.rogues (id text PRIMARY KEY, email text);"),
        ("secondary_rogue_index", "CREATE INDEX IF NOT EXISTS ON julia.rogues (email);"),
        ("generate_users", "CREATE TABLE IF NOT EXISTS julia.users (id text PRIMARY KEY, email text, name text, pronouns text, class_year text);"),
        ("generate_bonds", "CREATE TABLE IF NOT EXISTS julia.bonds (id text PRIMARY KEY, creator_id bigint, crush_id bigint, bond_type text, game_status text, created_at timestamp, updated_at timestamp);"),
    ];

    for &(title, current_query) in &queries {
        session.query(current_query, ()).await?;
        info!("{} successful", title)
    }

    Ok(())
}
