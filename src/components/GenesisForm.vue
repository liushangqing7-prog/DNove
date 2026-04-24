<script setup lang="ts">
import { ref } from 'vue';
import { useEditorStore } from '@/stores/editorStore';

const idea = ref('');
const loading = ref(false);
const editor = useEditorStore();

async function generateSkeleton() {
  if (!idea.value.trim()) return;
  loading.value = true;
  // TODO: 接入 AI Service factory + 模板系统
  editor.appendDraft(`# 一句话创世草案\n\n脑洞：${idea.value}\n\n- 风格：待补充\n- 核心冲突：待补充\n- 角色雏形：待补充`);
  loading.value = false;
}
</script>

<template>
  <section class="genesis">
    <h2>一句话创世</h2>
    <textarea v-model="idea" rows="4" placeholder="输入你的脑洞，生成全书骨架..." />
    <button :disabled="loading" @click="generateSkeleton">
      {{ loading ? '生成中...' : '生成全书骨架' }}
    </button>
  </section>
</template>

<style scoped>
.genesis { display:grid; gap:8px; max-width:720px; }
textarea { background:#10141c; color:var(--text); border:1px solid var(--border); border-radius:8px; padding:10px; }
button { width:180px; padding:8px 10px; background:var(--accent); border:none; color:#fff; border-radius:8px; cursor:pointer; }
</style>
