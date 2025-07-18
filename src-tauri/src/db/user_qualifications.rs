use crate::db::models::{DeleteUserQualifications, NewUserQualification, NewUserQualifications, UpdateUserQualification, UserQualification};
use sqlx::PgPool;
use uuid::Uuid;

/// ユーザーIDで資格情報を取得
pub async fn get_user_qualifications_by_user_id(pool: &PgPool, user_id: Uuid) -> Result<Vec<UserQualification>, sqlx::Error> {
  let qualifications = sqlx::query_as!(
    UserQualification,
    r#"
        SELECT user_id, qualification_id, acquired_at
        FROM user_qualifications
        WHERE user_id = $1
        "#,
    user_id
  )
  .fetch_all(pool)
  .await?;
  Ok(qualifications)
}

/// ユーザー資格情報を登録
pub async fn create_user_qualification(pool: &PgPool, input: &NewUserQualification) -> Result<UserQualification, sqlx::Error> {
  let qualification = sqlx::query_as!(
    UserQualification,
    r#"
        INSERT INTO user_qualifications (user_id, qualification_id, acquired_at)
        VALUES ($1, $2, $3)
        RETURNING user_id, qualification_id, acquired_at
        "#,
    input.user_id,
    input.qualification_id,
    input.acquired_at
  )
  .fetch_one(pool)
  .await?;
  Ok(qualification)
}

/// ユーザー資格情報をバルクインサートで複数登録
pub async fn create_user_qualifications(pool: &PgPool, input: &NewUserQualifications) -> Result<u64, sqlx::Error> {
  let qs = &input.qualifications;
  if qs.is_empty() {
    return Ok(0);
  }

  // プレースホルダ生成
  let mut values_sql = Vec::new();
  for i in 0..qs.len() {
    // 3つごとにインデックス
    let base = i * 3;
    values_sql.push(format!("(${}, ${}, ${})", base + 1, base + 2, base + 3));
  }

  let sql = format!(
    "INSERT INTO user_qualifications (user_id, qualification_id, acquired_at) VALUES {} ON CONFLICT DO NOTHING",
    values_sql.join(", ")
  );

  // 値の展開
  let mut query = sqlx::query(&sql);
  for q in qs {
    query = query.bind(q.user_id).bind(&q.qualification_id).bind(q.acquired_at);
  }

  let result = query.execute(pool).await?;
  Ok(result.rows_affected())
}

/// ユーザー資格情報を更新
/// 処理はUPSERTで作っており、なければINSERTし、あればUPDATEする
pub async fn upsert_user_qualification(pool: &PgPool, input: &NewUserQualification) -> Result<UserQualification, sqlx::Error> {
  let qualification = sqlx::query_as!(
    UserQualification,
    r#"
            INSERT INTO user_qualifications (user_id, qualification_id, acquired_at)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, qualification_id) DO UPDATE
            SET acquired_at = EXCLUDED.acquired_at
            RETURNING user_id, qualification_id, acquired_at
        "#,
    input.user_id,
    input.qualification_id,
    input.acquired_at
  )
  .fetch_one(pool)
  .await?;
  Ok(qualification)
}

/// ユーザー資格情報を削除
pub async fn delete_user_qualifications(pool: &PgPool, input: &DeleteUserQualifications) -> Result<u64, sqlx::Error> {
  let result = sqlx::query!(
    r#"
        DELETE FROM user_qualifications
        WHERE user_id = $1 AND qualification_id = ANY($2)
        "#,
    input.user_id,
    &input.qualification_ids
  )
  .execute(pool)
  .await?;

  Ok(result.rows_affected())
}
