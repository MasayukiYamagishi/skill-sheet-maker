use crate::db::models::{CareerProcess, DeleteCareerProcesses, NewCareerProcess, NewCareerProcesses, UpdateCareerProcess};
use sqlx::PgPool;
use uuid::Uuid;

/// 指定経歴IDに紐づく全ての担当工程を取得
pub async fn fetch_career_processes_by_career_id(pool: &PgPool, career_id: Uuid) -> Result<Vec<CareerProcess>, sqlx::Error> {
  let result = sqlx::query_as!(
    CareerProcess,
    r#"
            SELECT career_id, process_id
            FROM career_processes
            WHERE career_id = $1
        "#,
    career_id
  )
  .fetch_all(pool)
  .await?;
  Ok(result)
}

/// 担当工程（単数・複数）まとめて登録
/// （戻り値は登録した件数、重複はスキップされる）
pub async fn insert_career_processes(pool: &PgPool, processes: &[NewCareerProcess]) -> Result<u64, sqlx::Error> {
  if processes.is_empty() {
    return Ok(0);
  }

  // 動的にVALUES部分を作成
  let mut values_sql = Vec::new();
  for i in 0..processes.len() {
    let base = i * 2;
    values_sql.push(format!("(${}, ${})", base + 1, base + 2));
  }
  let sql = format!(
    "INSERT INTO career_processes (career_id, process_id) VALUES {} ON CONFLICT DO NOTHING",
    values_sql.join(", ")
  );

  // クエリに値をバインド
  let mut query = sqlx::query(&sql);
  for p in processes {
    query = query.bind(p.career_id).bind(p.process_id);
  }

  let result = query.execute(pool).await?;
  Ok(result.rows_affected())
}

/// 経歴に紐づく担当工程更新
pub async fn update_career_process(pool: &PgPool, old_career_id: Uuid, old_process_id: i32, input: &UpdateCareerProcess) -> Result<CareerProcess, sqlx::Error> {
  let rec = sqlx::query_as!(
    CareerProcess,
    r#"
            UPDATE career_processes
            SET
                career_id = COALESCE($3, career_id),
                process_id = COALESCE($4, process_id)
            WHERE career_id = $1 AND process_id = $2
            RETURNING career_id, process_id
        "#,
    old_career_id,
    old_process_id,
    input.career_id,
    input.process_id
  )
  .fetch_one(pool)
  .await?;
  Ok(rec)
}

/// 経歴に紐づく担当工程の削除
pub async fn delete_career_processes(pool: &PgPool, input: &DeleteCareerProcesses) -> Result<u64, sqlx::Error> {
  if input.process_ids.is_empty() {
    return Ok(0);
  }
  let sql = "DELETE FROM career_processes WHERE career_id = $1 AND process_id = ANY($2)";
  let result = sqlx::query(sql).bind(input.career_id).bind(&input.process_ids).execute(pool).await?;
  Ok(result.rows_affected())
}
