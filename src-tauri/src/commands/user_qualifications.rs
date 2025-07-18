use crate::db::{
  models::{DeleteUserQualifications, NewUserQualification, NewUserQualifications, UserQualification},
  user_qualifications,
};
use sqlx::PgPool;
use tauri::State;
use uuid::Uuid;

// 資格一覧取得
#[tauri::command]
pub async fn get_user_qualifications_by_user_id(pool: State<'_, PgPool>, user_id: Uuid) -> Result<Vec<UserQualification>, String> {
  user_qualifications::get_user_qualifications_by_user_id(&pool, user_id).await.map_err(|e| e.to_string())
}

// 単一資格登録
#[tauri::command]
pub async fn create_user_qualification(pool: State<'_, PgPool>, input: NewUserQualification) -> Result<UserQualification, String> {
  user_qualifications::create_user_qualification(&pool, &input).await.map_err(|e| e.to_string())
}

// 複数資格登録（バルク）
#[tauri::command]
pub async fn create_user_qualifications(pool: State<'_, PgPool>, input: NewUserQualifications) -> Result<u64, String> {
  user_qualifications::create_user_qualifications(&pool, &input).await.map_err(|e| e.to_string())
}

// 単一資格をUPSERTで登録/更新
#[tauri::command]
pub async fn upsert_user_qualification(pool: State<'_, PgPool>, input: NewUserQualification) -> Result<UserQualification, String> {
  user_qualifications::upsert_user_qualification(&pool, &input).await.map_err(|e| e.to_string())
}

// 複数資格を削除
#[tauri::command]
pub async fn delete_user_qualifications(pool: State<'_, PgPool>, input: DeleteUserQualifications) -> Result<u64, String> {
  user_qualifications::delete_user_qualifications(&pool, &input).await.map_err(|e| e.to_string())
}
