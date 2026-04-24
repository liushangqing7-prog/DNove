import { invoke } from '@tauri-apps/api/core';
import type { WorkspacePrefs } from '@/models/workspace';

export interface WorkspaceTreeNode {
  name: string;
  path: string;
  isDir: boolean;
}

export const tauriWorkspaceService = {
  async getPrefs(): Promise<WorkspacePrefs | null> {
    return invoke('load_workspace_prefs');
  },

  async savePrefs(prefs: WorkspacePrefs): Promise<void> {
    await invoke('save_workspace_prefs', { prefs });
  },

  async pickWorkspaceDirectory(): Promise<string | null> {
    return invoke('pick_workspace_directory');
  },

  async listNovelRoot(path: string): Promise<WorkspaceTreeNode[]> {
    return invoke('list_novel_root', { path });
  }
};
