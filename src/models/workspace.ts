export interface WorkspacePrefs {
  workspaceRoot: string;
  recentNovels: string[];
  activeNovel?: string;
  aiProfiles: AIProviderProfile[];
  budget: BudgetConfig;
}

export interface BudgetConfig {
  monthlyLimitUsd: number;
  remindThresholdPct: number;
}

export interface NovelMeta {
  id: string;
  title: string;
  description: string;
  genre?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  globalParams: Record<string, string | number | boolean>;
}

export interface ChapterMeta {
  id: string;
  title: string;
  order: number;
  wordCount: number;
  summary?: string;
  status: 'draft' | 'reviewed' | 'published';
  updatedAt: string;
}

export interface DraftProposal {
  id: string;
  source: 'ai' | 'user';
  content: string;
  createdAt: string;
  model?: string;
}

export interface SettingEntity {
  id: string;
  name: string;
  type: 'character' | 'world' | 'outline' | 'location' | 'power';
  status: 'draft' | 'confirmed';
  userConfirmed: boolean;
  frontMatter: Record<string, unknown>;
  body: string;
  proposals: DraftProposal[];
}

export interface AIProviderProfile {
  id: string;
  provider: 'openai' | 'claude' | 'deepseek' | 'qwen' | 'custom';
  label: string;
  endpoint: string;
  model: string;
  apiKeyMasked?: string;
  params: ModelParams;
}

export interface ModelParams {
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
}

export interface PromptTemplate {
  id: string;
  name: string;
  path: string;
  content: string;
  placeholders: string[];
}
