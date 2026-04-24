import { AIService } from './AIService';
import type { AIGenerateRequest, AIGenerateResult } from './types';

export class OpenAIAdapter extends AIService {
  providerName(): string {
    return 'openai';
  }

  async generate(request: AIGenerateRequest): Promise<AIGenerateResult[]> {
    const response = await fetch(`${this.context.endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.context.apiKey}`
      },
      body: JSON.stringify({
        model: this.context.model,
        n: request.n ?? 1,
        messages: [
          ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
          { role: 'user', content: request.prompt }
        ],
        temperature: request.params.temperature,
        top_p: request.params.topP,
        frequency_penalty: request.params.frequencyPenalty,
        presence_penalty: request.params.presencePenalty,
        max_tokens: request.params.maxTokens
      })
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`OpenAI request failed: ${message}`);
    }

    const data = await response.json();
    return (data.choices ?? []).map((choice: any) => ({
      text: choice.message?.content ?? '',
      model: data.model,
      usage: data.usage
        ? {
            promptTokens: data.usage.prompt_tokens,
            completionTokens: data.usage.completion_tokens,
            totalTokens: data.usage.total_tokens
          }
        : undefined
    })) as AIGenerateResult[];
  }
}
