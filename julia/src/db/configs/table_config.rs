use scylla::Session;
use std::error::Error;

pub async fn create_tables(session: &Session) -> Result<(), Box<dyn Error>> {
    session
        .query(
            "CREATE KEYSPACE IF NOT EXISTS julia WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };",
            (),
        )
        .await?;


    session
        .query(
            "CREATE TABLE IF NOT EXISTS julia.rogues (id text PRIMARY KEY, email text);",
            (),
        )
        .await?;

    session
        .query(
            "CREATE TABLE IF NOT EXISTS julia.users (id text PRIMARY KEY, email text, name text, pronouns text, class_year text);",
            (),
        )
        .await?;

    session
        .query(
            "CREATE TABLE IF NOT EXISTS julia.bonds (id text PRIMARY KEY, creator_id bigint, crush_id bigint, bond_type text, game_status text, created_at timestamp, updated_at timestamp);",
            (),
        )
        .await?;

    Ok(())
}
