import { OpenAIAdapter } from './OpenAIAdapter';
import type { AIAdapterContext } from './types';
import { AIService } from './AIService';

export function buildAIService(provider: string, context: AIAdapterContext): AIService {
  switch (provider) {
    case 'openai':
      return new OpenAIAdapter(context);
    default:
      throw new Error(`Provider ${provider} is not implemented yet.`);
  }
}
