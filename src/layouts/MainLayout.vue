<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkspaceStore } from '@/stores/workspaceStore';

const workspace = useWorkspaceStore();
const router = useRouter();

onMounted(async () => {
  await workspace.bootstrap();
  if (!workspace.hasWorkspace) {
    router.push('/settings');
  }
});
</script>

<template>
  <div class="shell">
    <header class="header">
      <h1>DNove</h1>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/editor">编辑</RouterLink>
        <RouterLink to="/settings">设置</RouterLink>
      </nav>
    </header>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.shell { min-height: 100vh; background: var(--bg); color: var(--text); }
.header { display:flex; justify-content:space-between; align-items:center; padding:12px 20px; border-bottom:1px solid var(--border); }
nav { display:flex; gap: 14px; }
.content { padding: 16px; }
a.router-link-active { color: var(--accent); }
</style>
