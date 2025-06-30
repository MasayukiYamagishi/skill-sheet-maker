use sqlx::sqlite::SqlitePoolOptions;

pub async fn init_pool() -> anyhow::Result<sqlx::SqlitePoolOptions> {
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect("sqlite://users.db")
        .await?;
    Ok(pool)
}
