import { definePlugin, defineRule } from 'vite-plus/lint/plugins'

// `oxlint-disable-next-line rule -- 理由` のような無効化コメントを拾う。
// ESLint の書き方 (`eslint-disable`) も Oxlint は解釈するので、両方を見る
const DISABLE_DIRECTIVE = /^\s*(?:eslint|oxlint)-disable(?:-next-line|-line)?(?=\s|$)(.*)$/s

export const requireDisableReason = defineRule({
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require a reason after `--` in lint disable directives.',
    },
    messages: {
      missingReason:
        'Explain why this rule is disabled, e.g. `// oxlint-disable-next-line <rule> -- <reason>`.',
    },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          const match = DISABLE_DIRECTIVE.exec(comment.value)
          if (!match) continue
          const reason = match[1].split(/\s--\s/)[1]?.trim()
          if (!reason) {
            context.report({ loc: comment.loc, messageId: 'missingReason' })
          }
        }
      },
    }
  },
})

export default definePlugin({
  meta: { name: 'trpfrog' },
  rules: { 'require-disable-reason': requireDisableReason },
})
