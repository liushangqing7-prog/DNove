<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEditorStore } from '@/stores/editorStore';

const editor = useEditorStore();
const { drafts } = storeToRefs(editor);
</script>

<template>
  <aside class="draft-panel">
    <h3>AI 草案区</h3>
    <article v-for="draft in drafts" :key="draft.id" class="draft-item">
      <header>
        <small>{{ draft.model ?? 'unknown model' }}</small>
        <button @click="editor.adoptDraft(draft.id)">采用</button>
      </header>
      <textarea v-model="draft.content" rows="6" />
    </article>
  </aside>
</template>

<style scoped>
.draft-panel { border-left:1px solid var(--border); padding:12px; height:100%; overflow:auto; }
.draft-item { border:1px solid var(--border); border-radius:8px; padding:8px; margin-bottom:10px; background:#111827; }
header { display:flex; justify-content:space-between; margin-bottom:8px; }
textarea { width:100%; background:#0b1120; color:var(--text); border:1px solid var(--border); }
</style>
