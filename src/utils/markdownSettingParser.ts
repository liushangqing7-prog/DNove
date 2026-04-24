import YAML from 'yaml';
import type { SettingEntity } from '@/models/workspace';

const FRONT_MATTER_BOUNDARY = '---';

export function parseMarkdownWithFrontMatter(
  markdown: string,
  fallback: Pick<SettingEntity, 'id' | 'name' | 'type'>
): SettingEntity {
  const trimmed = markdown.trimStart();
  if (!trimmed.startsWith(FRONT_MATTER_BOUNDARY)) {
    return {
      ...fallback,
      status: 'draft',
      userConfirmed: false,
      frontMatter: {},
      body: markdown,
      proposals: []
    };
  }

  const sections = trimmed.split(FRONT_MATTER_BOUNDARY);
  const fmRaw = sections[1] ?? '';
  const body = sections.slice(2).join(FRONT_MATTER_BOUNDARY).trimStart();
  const fm = YAML.parse(fmRaw) as Record<string, unknown>;

  return {
    ...fallback,
    status: (fm.status as 'draft' | 'confirmed') ?? 'draft',
    userConfirmed: Boolean(fm.user_confirmed),
    frontMatter: fm,
    body,
    proposals: []
  };
}

export function serializeSettingMarkdown(entity: SettingEntity): string {
  const frontMatter = {
    ...entity.frontMatter,
    status: entity.status,
    user_confirmed: entity.userConfirmed
  };
  return `---\n${YAML.stringify(frontMatter).trimEnd()}\n---\n\n${entity.body}\n`;
}
