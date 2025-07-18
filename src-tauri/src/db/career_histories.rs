use crate::db::models::{CareerHistory, DeleteCareerHistories, NewCareerHistories, NewCareerHistory, UpdateCareerHistory};
use sqlx::PgPool;
use uuid::Uuid;

/// ユーザIDで経歴情報を取得する
pub async fn fetch_career_history_by_user_id(pool: &PgPool, user_id: Uuid) -> Result<Vec<CareerHistory>, sqlx::Error> {
  let history = sqlx::query_as!(
    CareerHistory,
    r#"
        SELECT id, user_id, title, started_at, ended_at, description, role, scale
        FROM career_histories WHERE user_id = $1
        "#,
    user_id
  )
  .fetch_all(pool)
  .await?;
  Ok(history)
}

/// 単一の経歴をID指定で取得
pub async fn fetch_career_history_by_id(pool: &PgPool, id: Uuid) -> Result<Option<CareerHistory>, sqlx::Error> {
  let history = sqlx::query_as!(
    CareerHistory,
    r#"
        SELECT id, user_id, title, started_at, ended_at, description, role, scale
        FROM career_histories WHERE id = $1
        "#,
    id
  )
  .fetch_optional(pool)
  .await?;
  Ok(history)
}

/// 経歴を追加（単数・複数どちらでもOK）
/// 戻り値は追加したレコードすべて
pub async fn insert_career_histories(pool: &PgPool, histories: &[NewCareerHistory]) -> Result<Vec<CareerHistory>, sqlx::Error> {
  if histories.is_empty() {
    return Ok(Vec::new());
  }

  let mut tx = pool.begin().await?;
  let mut result = Vec::new();

  for history in histories {
    let rec = sqlx::query_as!(
      CareerHistory,
      r#"
            INSERT INTO career_histories (user_id, title, started_at, ended_at, description, role, scale)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, user_id, title, started_at, ended_at, description, role, scale
            "#,
      history.user_id,
      history.title,
      history.started_at,
      history.ended_at,
      history.description,
      history.role,
      history.scale
    )
    .fetch_one(&mut *tx)
    .await?;
    result.push(rec);
  }

  tx.commit().await?;
  Ok(result)
}

/// 経歴情報の更新（部分更新）
pub async fn update_career_history(pool: &PgPool, input: &UpdateCareerHistory) -> Result<CareerHistory, sqlx::Error> {
  let rec = sqlx::query_as!(
    CareerHistory,
    r#"
        UPDATE career_histories
        SET
            title = COALESCE($2, title),
            started_at = COALESCE($3, started_at),
            ended_at = COALESCE($4, ended_at),
            description = COALESCE($5, description),
            role = COALESCE($6, role),
            scale = COALESCE($7, scale)
        WHERE id = $1 AND user_id = $8
        RETURNING id, user_id, title, started_at, ended_at, description, role, scale
        "#,
    input.id,
    input.title.as_ref(),
    input.started_at,
    input.ended_at,
    input.description.as_ref(),
    input.role.as_ref(),
    input.scale.as_ref(),
    input.user_id
  )
  .fetch_one(pool)
  .await?;
  Ok(rec)
}

/// 経歴情報の削除（単数・複数可）
pub async fn delete_career_histories(pool: &PgPool, input: &DeleteCareerHistories) -> Result<u64, sqlx::Error> {
  if input.ids.is_empty() {
    return Ok(0);
  }
  let query = format!("DELETE FROM career_histories WHERE id = ANY($1)");
  let result = sqlx::query(&query).bind(&input.ids).execute(pool).await?;
  Ok(result.rows_affected())
}
