use crate::db::career_histories as db_career_histories;
use crate::db::models::{CareerHistory, DeleteCareerHistories, NewCareerHistories, NewCareerHistory, UpdateCareerHistory};
use sqlx::PgPool;
use tauri::State;
use uuid::Uuid;

// ユーザIDで経歴情報を取得
#[tauri::command]
pub async fn fetch_career_history_by_user_id(pool: State<'_, PgPool>, user_id: Uuid) -> Result<Vec<CareerHistory>, String> {
  db_career_histories::fetch_career_history_by_user_id(&pool, user_id).await.map_err(|e| e.to_string())
}

// 単一の経歴をID指定で取得
#[tauri::command]
pub async fn fetch_career_history_by_id(pool: State<'_, PgPool>, id: Uuid) -> Result<Option<CareerHistory>, String> {
  db_career_histories::fetch_career_history_by_id(&pool, id).await.map_err(|e| e.to_string())
}

// 経歴を追加（単数・複数可）
#[tauri::command]
pub async fn insert_career_histories(pool: State<'_, PgPool>, input: NewCareerHistories) -> Result<Vec<CareerHistory>, String> {
  db_career_histories::insert_career_histories(&pool, &input.histories).await.map_err(|e| e.to_string())
}

// 経歴情報の更新
#[tauri::command]
pub async fn update_career_history(pool: State<'_, PgPool>, input: UpdateCareerHistory) -> Result<CareerHistory, String> {
  db_career_histories::update_career_history(&pool, &input).await.map_err(|e| e.to_string())
}

// 経歴情報の削除（単数・複数可）
#[tauri::command]
pub async fn delete_career_histories(pool: State<'_, PgPool>, input: DeleteCareerHistories) -> Result<u64, String> {
  db_career_histories::delete_career_histories(&pool, &input).await.map_err(|e| e.to_string())
}
