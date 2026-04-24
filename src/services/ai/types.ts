import type { ModelParams } from '@/models/workspace';

export interface AIGenerateRequest {
  prompt: string;
  systemPrompt?: string;
  n?: number;
  params: ModelParams;
}

export interface AIGenerateUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd?: number;
}

export interface AIGenerateResult {
  text: string;
  model: string;
  usage?: AIGenerateUsage;
}

export interface AIAdapterContext {
  apiKey: string;
  endpoint: string;
  model: string;
}
