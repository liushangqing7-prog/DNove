import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { WorkspacePrefs } from '@/models/workspace';
import { tauriWorkspaceService } from '@/services/tauriWorkspaceService';

const defaultPrefs: WorkspacePrefs = {
  workspaceRoot: '',
  recentNovels: [],
  aiProfiles: [],
  budget: {
    monthlyLimitUsd: 20,
    remindThresholdPct: 80
  }
};

export const useWorkspaceStore = defineStore('workspace', () => {
  const prefs = ref<WorkspacePrefs>({ ...defaultPrefs });
  const initialized = ref(false);

  const hasWorkspace = computed(() => prefs.value.workspaceRoot.length > 0);

  async function bootstrap() {
    const loaded = await tauriWorkspaceService.getPrefs();
    prefs.value = loaded ?? { ...defaultPrefs };
    initialized.value = true;
  }

  async function chooseWorkspace() {
    const selected = await tauriWorkspaceService.pickWorkspaceDirectory();
    if (!selected) return;
    prefs.value.workspaceRoot = selected;
    await tauriWorkspaceService.savePrefs(prefs.value);
  }

  async function updatePrefs(next: WorkspacePrefs) {
    prefs.value = next;
    await tauriWorkspaceService.savePrefs(next);
  }

  return { prefs, initialized, hasWorkspace, bootstrap, chooseWorkspace, updatePrefs };
});
