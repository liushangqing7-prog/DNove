<template>
  <section class="editor-grid">
    <OutlinePanel />
    <MarkdownEditorPanel />
    <AIDraftPanel />
  </section>
</template>

<script setup lang="ts">
import OutlinePanel from '@/components/OutlinePanel.vue';
import MarkdownEditorPanel from '@/components/MarkdownEditorPanel.vue';
import AIDraftPanel from '@/components/AIDraftPanel.vue';
</script>

<style scoped>
.editor-grid { display:grid; grid-template-columns: 260px 1fr 340px; height: calc(100vh - 110px); border:1px solid var(--border); border-radius:12px; overflow:hidden; }
</style>
