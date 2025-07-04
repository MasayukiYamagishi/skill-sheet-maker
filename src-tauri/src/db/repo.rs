use serde::Serialize;
use sqlx::{FromRow, SqlitePool};

#[derive(Serialize, FromRow)]
pub struct User {
  pub id: i64,
  pub user_identifier: String,
  pub name: String,
  pub name_reading: String,
  pub birth_date: Option<String>,
  pub age: Option<i32>,
  pub gender: Option<String>,
  pub email: String,
  pub mbti_result: Option<String>,
  pub mbti_explanation: Option<String>,
  pub enrollment_start_date: Option<String>,
  pub enrollment_end_date: Option<String>,
}

pub struct NewUser<'a> {
  pub user_identifier: &'a str,
  pub name: &'a str,
  pub name_reading: &'a str,
  pub birth_date: Option<&'a str>,
  pub age: Option<i32>,
  pub gender: Option<&'a str>,
  pub email: &'a str,
  pub mbti_result: Option<&'a str>,
  pub mbti_explanation: Option<&'a str>,
  pub enrollment_start_date: Option<&'a str>,
  pub enrollment_end_date: Option<&'a str>,
}

pub async fn create_user(pool: &SqlitePool, u: NewUser<'_>) -> anyhow::Result<User> {
  let rec = sqlx::query_as!(
    User,
    r#"
    INSERT INTO users (
      user_identifier, name, name_reading, birth_date, age,
      gender, email, mbti_result, mbti_explanation,
      enrollment_start_date, enrollment_end_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING *
    "#,
    u.user_identifier,
    u.name,
    u.name_reading,
    u.birth_date,
    u.age,
    u.gender,
    u.email,
    u.mbti_result,
    u.mbti_explanation,
    u.enrollment_start_date,
    u.enrollment_end_date
  )
  .fetch_one(pool)
  .await?;

  Ok(rec)
}

pub async fn list_users(pool: &SqlitePool) -> anyhow::Result<Vec<User>> {
  let rows = sqlx::query_as!(User, "SELECT * FROM users").fetch_all(pool).await?;
  Ok(rows)
}

pub async fn get_user(pool: &SqlitePool, id: i64) -> anyhow::Result<Option<User>> {
  let row = sqlx::query_as!(User, "SELECT * FROM users WHERE id = ?", id).fetch_optional(pool).await?;
  Ok(row)
}

pub async fn update_user(pool: &SqlitePool, u: User) -> anyhow::Result<User> {
  let rec = sqlx::query_as!(
    User,
    r#"
    UPDATE users SET
      user_identifier = ?, name = ?, name_reading = ?, birth_date = ?, age = ?,
      gender = ?, email = ?, mbti_result = ?, mbti_explanation = ?,
      enrollment_start_date = ?, enrollment_end_date = ?
    WHERE id = ?
    RETURNING *
    "#,
    u.user_identifier,
    u.name,
    u.name_reading,
    u.birth_date,
    u.age,
    u.gender,
    u.email,
    u.mbti_result,
    u.mbti_explanation,
    u.enrollment_start_date,
    u.enrollment_end_date,
    u.id
  )
  .fetch_one(pool)
  .await?;
  Ok(rec)
}

pub async fn delete_user(pool: &SqlitePool, id: i64) -> anyhow::Result<()> {
  sqlx::query!("DELETE FROM users WHERE id = ?", id).execute(pool).await?;
  Ok(())
}
