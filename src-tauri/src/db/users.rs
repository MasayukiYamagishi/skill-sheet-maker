use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, PgPool};

#[derive(Serialize, Deserialize, FromRow, Clone)]
pub struct User {
  pub id: i32,
  pub user_identifier: String,
  pub name: String,
  pub name_reading: String,
  pub birth_date: Option<NaiveDate>,
  pub age: Option<i32>,
  pub gender: Option<String>,
  pub email: String,
  pub mbti_result: Option<String>,
  pub mbti_explanation: Option<String>,
  pub enrollment_start_date: Option<NaiveDate>,
  pub enrollment_end_date: Option<NaiveDate>,
}

#[derive(Deserialize)]
pub struct NewUser {
  pub user_identifier: String,
  pub name: String,
  pub name_reading: String,
  pub birth_date: Option<NaiveDate>,
  pub age: Option<i32>,
  pub gender: Option<String>,
  pub email: String,
  pub mbti_result: Option<String>,
  pub mbti_explanation: Option<String>,
  pub enrollment_start_date: Option<NaiveDate>,
  pub enrollment_end_date: Option<NaiveDate>,
}

pub async fn create_user(pool: &PgPool, u: NewUser) -> anyhow::Result<User> {
  let rec = sqlx::query_as(
    r#"
    INSERT INTO users (
      user_identifier, name, name_reading, birth_date, age,
      gender, email, mbti_result, mbti_explanation,
      enrollment_start_date, enrollment_end_date
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
    "#,
  )
  .bind(u.user_identifier)
  .bind(u.name)
  .bind(u.name_reading)
  .bind(u.birth_date)
  .bind(u.age)
  .bind(u.gender)
  .bind(u.email)
  .bind(u.mbti_result)
  .bind(u.mbti_explanation)
  .bind(u.enrollment_start_date)
  .bind(u.enrollment_end_date)
  .fetch_one(pool)
  .await?;

  Ok(rec)
}

pub async fn list_users(pool: &PgPool) -> anyhow::Result<Vec<User>> {
  let rows = sqlx::query_as("SELECT * FROM users").fetch_all(pool).await?;
  Ok(rows)
}

pub async fn get_user(pool: &PgPool, id: i32) -> anyhow::Result<Option<User>> {
  let row = sqlx::query_as("SELECT * FROM users WHERE id = $1").bind(id).fetch_optional(pool).await?;
  Ok(row)
}

pub async fn update_user(pool: &PgPool, u: User) -> anyhow::Result<User> {
  let rec = sqlx::query_as(
    r#"
    UPDATE users SET
      user_identifier = $1, name = $2, name_reading = $3, birth_date = $4, age = $5,
      gender = $6, email = $7, mbti_result = $8, mbti_explanation = $9,
      enrollment_start_date = $10, enrollment_end_date = $11
    WHERE id = $12
    RETURNING *
    "#,
  )
  .bind(u.user_identifier)
  .bind(u.name)
  .bind(u.name_reading)
  .bind(u.birth_date)
  .bind(u.age)
  .bind(u.gender)
  .bind(u.email)
  .bind(u.mbti_result)
  .bind(u.mbti_explanation)
  .bind(u.enrollment_start_date)
  .bind(u.enrollment_end_date)
  .bind(u.id)
  .fetch_one(pool)
  .await?;
  Ok(rec)
}

pub async fn delete_user(pool: &PgPool, id: i32) -> anyhow::Result<()> {
  sqlx::query("DELETE FROM users WHERE id = $1").bind(id).execute(pool).await?;
  Ok(())
}
