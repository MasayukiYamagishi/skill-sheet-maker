// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod db;
use crate::commands::users::{delete_users_by_ids_command, get_all_users_command, get_user_by_id_command, insert_user_command, update_user_by_id_command};

fn main() {
  dotenvy::dotenv().ok();
  tauri::async_runtime::block_on(async_main());
}

async fn async_main() {
  let pool = crate::db::pool::init_pool().await.expect("Failed to create pool");

  tauri::Builder::default()
    .manage(pool)
    .invoke_handler(tauri::generate_handler![
      get_all_users_command,
      get_user_by_id_command,
      insert_user_command,
      update_user_by_id_command,
      delete_users_by_ids_command,
    ])
    .run(tauri::generate_context!()) // VSCodeでRust Analyzerを入れるとエラーが出るが、問題なく動くので無視してOK
    .expect("error while running tauri application");
}
