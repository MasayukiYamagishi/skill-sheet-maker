use sqlx::PgPool;
use tauri::State;
use uuid::Uuid;

use crate::db::{
  models::{NewUser, UpdateUser, User},
  users,
};

/**
 * ユーザ情報全件取得.
 */
#[tauri::command]
pub async fn get_all_users_command(pool: State<'_, PgPool>) -> Result<Vec<User>, String> {
  match users::fetch_all_users(&pool).await {
    Ok(users) => Ok(users),
    Err(e) => Err(e.to_string()),
  }
}

/**
 * 指定したIDのユーザ情報取得.
 */
#[tauri::command]
pub async fn get_user_by_id_command(pool: State<'_, PgPool>, id: Uuid) -> Result<Option<User>, String> {
  match users::fetch_user_by_id(&pool, id).await {
    Ok(user) => Ok(user),
    Err(e) => Err(e.to_string()),
  }
}

/**
 * ユーザ新規登録.
 */
#[tauri::command]
pub async fn insert_user_command(pool: State<'_, PgPool>, payload: NewUser) -> Result<Uuid, String> {
  users::insert_user(&pool, payload).await.map_err(|e| e.to_string())
}

/**
 * ユーザ情報更新.
 */
#[tauri::command]
pub async fn update_user_by_id_command(pool: State<'_, PgPool>, id: Uuid, payload: UpdateUser) -> Result<u64, String> {
  users::update_user_by_id(&pool, id, payload).await.map_err(|e| e.to_string())
}

/**
 * ユーザ情報削除.
 */
#[tauri::command]
pub async fn delete_users_by_ids_command(pool: State<'_, PgPool>, ids: Vec<Uuid>) -> Result<u64, String> {
  users::delete_users_by_ids(&pool, &ids).await.map_err(|e| e.to_string())
}
