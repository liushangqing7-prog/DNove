<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEditorStore } from '@/stores/editorStore';

const editor = useEditorStore();
const { content, wordCount } = storeToRefs(editor);
</script>

<template>
  <section class="editor-panel">
    <textarea v-model="content" placeholder="开始创作..." />
    <div class="footer">
      <span>字数：{{ wordCount }}</span>
      <span>卡时：00:00</span>
      <span>快捷键：Ctrl+S 保存</span>
    </div>
  </section>
</template>

<style scoped>
.editor-panel { display:flex; flex-direction:column; height:100%; }
textarea { flex:1; width:100%; background:#10141c; color:var(--text); border:1px solid var(--border); border-radius:8px; padding:12px; resize:none; }
.footer { display:flex; justify-content:space-between; margin-top:8px; color: var(--muted); font-size:12px; }
</style>
