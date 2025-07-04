// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tokio::main]
async fn main() {
  // .envをロード
  dotenvy::dotenv().ok();

  let pool = orbit_lib::db::pool::init_pool()
    .await
    .expect("Failed to create pool");

  tauri::Builder::default()
    .manage(pool)
    .invoke_handler(tauri::generate_handler![
      orbit_lib::handlers::get_app_version,
      orbit_lib::handlers::get_app_production,
      orbit_lib::commands::create_user_cmd,
      orbit_lib::commands::list_users_cmd,
      orbit_lib::commands::get_user_cmd,
      orbit_lib::commands::update_user_cmd,
      orbit_lib::commands::delete_user_cmd,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
