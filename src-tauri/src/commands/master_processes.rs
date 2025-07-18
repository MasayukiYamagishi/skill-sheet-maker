use crate::db::{master_processes, MasterProcess};
use tauri::State;

/// 工程全件取得.
#[tauri::command]
pub async fn fetch_all_processes_command(pool: State<'_, sqlx::PgPool>) -> Result<Vec<MasterProcess>, String> {
  master_processes::fetch_all_processes(&pool).await.map_err(|e| e.to_string())
}
