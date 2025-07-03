// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod commands;
pub mod db;
pub mod util;

pub mod handlers {
  use std::env;

  #[tauri::command]
  pub fn get_app_version() -> String {
    env::var("APP_VERSION").unwrap_or_else(|_| "unknown".into())
  }

  #[tauri::command]
  pub fn get_app_production() -> bool {
    env::var("APP_PRODUCTION").map(|s| s.to_lowercase() == "true").unwrap_or(false)
  }
}
