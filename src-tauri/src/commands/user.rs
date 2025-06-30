use crate::db::repo::{self, NewUser, User};
use sqlx::SqlitePool;
use tauri::command;

/// 新規ユーザ作成
#[command]
pub async fn create_user_cmd(pool: tauri::State<'_, SqlitePool>, u: NewUser<'_>) -> Result<User, String> {
  repo::create_user(&*pool, u).await.map_err(|e| e.to_string())
}

/// ユーザ一覧取得
#[command]
pub async fn list_users_cmd(pool: tauri::State<'_, SqlitePool>) -> Result<Vec<User>, String> {
  repo::list_users(&*pool).await.map_err(|e| e.to_string())
}

/// IDから単一ユーザ取得
#[command]
pub async fn get_user_cmd(pool: tauri::State<'_, SqlitePool>) -> Result<Option<User>, String> {
  repo::get_user(&*pool, id).await.map_err(|e| e.to_string())
}

/// ユーザ更新
#[command]
pub async fn update_user(pool: tauri::State<'_, SqlitePool>, user: User) -> Result<User, String> {
  repo::update_user(&*pool, user).await.map_err(|e| e.to_string())
}

/// ユーザー削除
#[command]
pub async fn delete_user_cmd(pool: tauri::State<'_, SqlitePool>, id: i64) -> Result<(), String> {
  repo::delete_user(&*pool, id).await.map_err(|e| e.to_string())
}
