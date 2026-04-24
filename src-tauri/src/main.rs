#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod workspace;

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            window.set_title("DNove")?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            workspace::load_workspace_prefs,
            workspace::save_workspace_prefs,
            workspace::pick_workspace_directory,
            workspace::list_novel_root,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
