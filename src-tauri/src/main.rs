// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;

fn main() {
    // tauri::Builder::default()
    //     .invoke_handler(tauri::generate_handler![
    //         commands::get_stats,
    //     ])
    //     .run(tauri::generate_context!())?;

    orbit_lib::run()
}
