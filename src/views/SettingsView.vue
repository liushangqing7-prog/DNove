<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWorkspaceStore } from '@/stores/workspaceStore';

const workspace = useWorkspaceStore();
const { prefs } = storeToRefs(workspace);
</script>

<template>
  <section class="settings">
    <h2>设置</h2>
    <p>当前工作区：{{ prefs.workspaceRoot || '未设置' }}</p>
    <button @click="workspace.chooseWorkspace">选择工作区根目录</button>
    <p class="hint">更换后可在后续版本中添加迁移向导（复制旧数据）。</p>
  </section>
</template>

<style scoped>
.settings { display:grid; gap:10px; max-width:760px; }
button { width:220px; padding:8px 10px; border-radius:8px; border:none; background:var(--accent); color:#fff; }
.hint { color: var(--muted); }
</style>
