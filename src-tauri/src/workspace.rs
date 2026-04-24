use serde::{Deserialize, Serialize};
use std::{fs, path::PathBuf};
use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;
use thiserror::Error;

const PREFS_FILE: &str = "DNove_prefs.json";

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct BudgetConfig {
    pub monthly_limit_usd: f64,
    pub remind_threshold_pct: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct WorkspacePrefs {
    pub workspace_root: String,
    pub recent_novels: Vec<String>,
    pub active_novel: Option<String>,
    pub ai_profiles: Vec<serde_json::Value>,
    pub budget: BudgetConfig,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct WorkspaceTreeNode {
    pub name: String,
    pub path: String,
    pub is_dir: bool,
}

#[derive(Error, Debug)]
pub enum WorkspaceError {
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),
    #[error("JSON error: {0}")]
    Json(#[from] serde_json::Error),
}

impl serde::Serialize for WorkspaceError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

fn app_prefs_path(app: &AppHandle) -> Result<PathBuf, WorkspaceError> {
    let mut base = app.path().app_config_dir().map_err(|err| {
        std::io::Error::new(std::io::ErrorKind::Other, format!("unable to resolve app dir: {err}"))
    })?;
    fs::create_dir_all(&base)?;
    base.push(PREFS_FILE);
    Ok(base)
}

#[tauri::command]
pub fn load_workspace_prefs(app: AppHandle) -> Result<Option<WorkspacePrefs>, WorkspaceError> {
    let path = app_prefs_path(&app)?;
    if !path.exists() {
        return Ok(None);
    }
    let content = fs::read_to_string(path)?;
    Ok(Some(serde_json::from_str(&content)?))
}

#[tauri::command]
pub fn save_workspace_prefs(app: AppHandle, prefs: WorkspacePrefs) -> Result<(), WorkspaceError> {
    let app_path = app_prefs_path(&app)?;
    fs::write(app_path, serde_json::to_string_pretty(&prefs)?)?;

    if !prefs.workspace_root.is_empty() {
        let workspace_prefs = PathBuf::from(prefs.workspace_root).join(PREFS_FILE);
        fs::write(workspace_prefs, serde_json::to_string_pretty(&prefs)?)?;
    }
    Ok(())
}

#[tauri::command]
pub async fn pick_workspace_directory(app: AppHandle) -> Result<Option<String>, WorkspaceError> {
    let selected = app
        .dialog()
        .file()
        .set_title("选择 DNove 工作区根目录")
        .blocking_pick_folder();

    Ok(selected.map(|f| {
        f.into_path()
            .map(|p| p.to_string_lossy().into_owned())
            .unwrap_or_default()
    }))
}

#[tauri::command]
pub fn list_novel_root(path: String) -> Result<Vec<WorkspaceTreeNode>, WorkspaceError> {
    let mut nodes = vec![];
    for entry in fs::read_dir(path)? {
        let entry = entry?;
        let meta = entry.metadata()?;
        nodes.push(WorkspaceTreeNode {
            name: entry.file_name().to_string_lossy().into_owned(),
            path: entry.path().to_string_lossy().into_owned(),
            is_dir: meta.is_dir(),
        });
    }
    nodes.sort_by_key(|n| (!n.is_dir, n.name.clone()));
    Ok(nodes)
}
