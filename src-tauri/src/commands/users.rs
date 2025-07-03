use crate::db::users::{self, NewUser, User};
use sqlx::PgPool;
use tauri::command;

/// 新規ユーザ作成
#[command]
pub async fn create_user_cmd(pool: tauri::State<'_, PgPool>, u: NewUser) -> Result<User, String> {
  users::create_user(&*pool, u).await.map_err(|e| e.to_string())
}

/// ユーザ一覧取得
#[command]
pub async fn list_users_cmd(pool: tauri::State<'_, PgPool>) -> Result<Vec<User>, String> {
  users::list_users(&*pool).await.map_err(|e| e.to_string())
}

/// IDから単一ユーザ取得
#[command]
pub async fn get_user_cmd(pool: tauri::State<'_, PgPool>, id: i32) -> Result<Option<User>, String> {
  users::get_user(&*pool, id).await.map_err(|e| e.to_string())
}

/// ユーザ更新
#[command]
pub async fn update_user_cmd(pool: tauri::State<'_, PgPool>, user: User) -> Result<User, String> {
  users::update_user(&*pool, user).await.map_err(|e| e.to_string())
}

/// ユーザー削除
#[command]
pub async fn delete_user_cmd(pool: tauri::State<'_, PgPool>, id: i32) -> Result<(), String> {
  users::delete_user(&*pool, id).await.map_err(|e| e.to_string())
}
