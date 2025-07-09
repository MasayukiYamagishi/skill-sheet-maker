use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;

pub async fn init_pool() -> anyhow::Result<PgPool> {
  let database_url = std::env::var("DATABASE_URL")
    .map_err(|e| anyhow::anyhow!("DATABASE_URL environment variable not set: {}", e))?;

  println!("Attempting to connect to database with URL: {}", database_url);

  let pool = PgPoolOptions::new()
    .max_connections(5)
    .connect(&database_url)
    .await
    .map_err(|e| anyhow::anyhow!("Failed to connect to database: {}", e))?;
  Ok(pool)
}
