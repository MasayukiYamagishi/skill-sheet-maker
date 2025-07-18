use crate::db::{
  career_processes,
  models::{CareerProcess, DeleteCareerProcesses, NewCareerProcess, UpdateCareerProcess},
};
use sqlx::PgPool;
use tauri::State;
use uuid::Uuid;

/// 経歴IDで担当工程一覧を取得
#[tauri::command]
pub async fn get_career_processes_by_career_id(pool: State<'_, PgPool>, career_id: Uuid) -> Result<Vec<CareerProcess>, String> {
  career_processes::fetch_career_processes_by_career_id(&pool, career_id).await.map_err(|e| e.to_string())
}

/// 担当工程を（単数/複数まとめて）登録
#[tauri::command]
pub async fn insert_career_processes(pool: State<'_, PgPool>, processes: Vec<NewCareerProcess>) -> Result<u64, String> {
  career_processes::insert_career_processes(&pool, &processes).await.map_err(|e| e.to_string())
}

/// 経歴に紐づく担当工程の更新
#[tauri::command]
pub async fn update_career_process(
  pool: State<'_, PgPool>,
  old_career_id: Uuid,
  old_process_id: i32,
  input: UpdateCareerProcess,
) -> Result<CareerProcess, String> {
  career_processes::update_career_process(&pool, old_career_id, old_process_id, &input).await.map_err(|e| e.to_string())
}

/// 経歴に紐づく担当工程の削除（複数可）
#[tauri::command]
pub async fn delete_career_processes(pool: State<'_, PgPool>, input: DeleteCareerProcesses) -> Result<u64, String> {
  career_processes::delete_career_processes(&pool, &input).await.map_err(|e| e.to_string())
}
