use scylla::Session;
use std::error::Error;
use tracing::info;

pub async fn initialize(session: &Session) -> Result<(), Box<dyn Error>> {
    let queries = vec![
        ("generate_keyspace", "CREATE KEYSPACE IF NOT EXISTS julia WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };"),
        ("generate_users", "CREATE TABLE IF NOT EXISTS julia.users (guid uuid PRIMARY KEY, email text, name text, pronouns text, class_year text);"),
        ("generate_rogues", "CREATE TABLE IF NOT EXISTS julia.rogues (email text, guid uuid, PRIMARY KEY (email));"),
        ("generate_bonds", "CREATE TABLE IF NOT EXISTS julia.bonds (guid uuid PRIMARY KEY, creator_guid uuid, crush_guid uuid, bond_type text, game_status text, created_at timestamp, updated_at timestamp);"),
        ("bond_creator_index", "CREATE INDEX on julia.bonds (creator_guid);"),
        ("bond_crush_index", "CREATE INDEX on julia.bonds (crush_guid);"),
    ];

    for &(title, current_query) in &queries {
        session.query(current_query, ()).await?;
        info!("{} successful", title)
    }

    Ok(())
}

pub async fn drop(session: &Session) -> Result<(), Box<dyn Error>> {
    let drop_actions = vec![
        ("rogue_table", "DROP TABLE IF EXISTS julia.rogues"),
        ("users_table", "DROP TABLE IF EXISTS julia.users"),
        ("bonds_table", "DROP TABLE IF EXISTS julia.bonds"),
    ];

    for &(drop_action, drop_query) in &drop_actions {
        session.query(drop_query, &[]).await?;

        info!("{} failed to drop", drop_action);
    }

    info!("All tables dropped");

    Ok(())
}
