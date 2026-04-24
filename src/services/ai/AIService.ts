import type { AIAdapterContext, AIGenerateRequest, AIGenerateResult } from './types';

export abstract class AIService {
  constructor(protected readonly context: AIAdapterContext) {}

  abstract providerName(): string;
  abstract generate(request: AIGenerateRequest): Promise<AIGenerateResult[]>;
}
