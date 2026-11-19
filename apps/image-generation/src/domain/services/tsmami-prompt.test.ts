import { describe, expect, it } from 'vite-plus/test'

import { createTsmamiPromptBuilder } from './tsmami-prompt'

describe('createTsmamiPromptBuilder', () => {
  const skillMarkdown = [
    '# Skill',
    '',
    '```text',
    'An example that is not the template',
    '```',
    '',
    '## Prompt template',
    '',
    '```text',
    'Intro',
    '',
    'Theme:',
    '{theme}',
    '',
    'Scene:',
    '{scene}',
    '',
    'Keep {name} as written',
    '',
    'Outro',
    '```',
  ].join('\n')
  const build = createTsmamiPromptBuilder(skillMarkdown)

  it('fills every placeholder', () => {
    const brief = { scene: 'A bakery.', style: 'Watercolor.', composition: 'Close-up.' }
    expect(build('tsmami-san baking', brief)).toBe(
      'Intro\n\nTheme:\ntsmami-san baking\n\nScene:\nA bakery.\n\nKeep {name} as written\n\nOutro',
    )
  })

  it('drops paragraphs whose placeholder has no value', () => {
    expect(build('tsmami-san baking')).toBe(
      'Intro\n\nTheme:\ntsmami-san baking\n\nKeep {name} as written\n\nOutro',
    )
  })

  it('reads a SKILL.md saved with CRLF line endings', () => {
    const crlf = createTsmamiPromptBuilder(skillMarkdown.replaceAll('\n', '\r\n'))
    expect(crlf('tsmami-san baking')).toBe(build('tsmami-san baking'))
  })

  it('throws when SKILL.md has no prompt template', () => {
    expect(() => createTsmamiPromptBuilder('# Skill\n\n```text\nHello\n```')).toThrow('not found')
  })
})
