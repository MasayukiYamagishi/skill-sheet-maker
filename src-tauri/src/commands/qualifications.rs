use crate::db::{models::Qualification, qualifications};
use tauri::State;

/// 資格情報全件取得.
#[tauri::command]
pub async fn fetch_all_qualifications_command(pool: State<'_, sqlx::PgPool>) -> Result<Vec<Qualification>, String> {
  qualifications::fetch_all_qualifications(&pool).await.map_err(|e| e.to_string())
}

/// 指定したIDの資格情報取得.
pub async fn fetch_qualification_by_id_command(pool: State<'_, sqlx::PgPool>, id: String) -> Result<Option<Qualification>, String> {
  qualifications::fetch_qualification_by_id(&pool, &id).await.map_err(|e| e.to_string())
}
