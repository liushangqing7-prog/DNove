import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { DraftProposal } from '@/models/workspace';

export const useEditorStore = defineStore('editor', () => {
  const content = ref('');
  const selectedText = ref('');
  const drafts = ref<DraftProposal[]>([]);

  const wordCount = computed(() => content.value.trim().split(/\s+/).filter(Boolean).length);

  function appendDraft(text: string, model?: string) {
    drafts.value.push({
      id: crypto.randomUUID(),
      source: 'ai',
      content: text,
      model,
      createdAt: new Date().toISOString()
    });
  }

  function adoptDraft(id: string) {
    const draft = drafts.value.find((item) => item.id === id);
    if (!draft) return;
    content.value += `\n\n${draft.content}`;
  }

  return { content, selectedText, drafts, wordCount, appendDraft, adoptDraft };
});
