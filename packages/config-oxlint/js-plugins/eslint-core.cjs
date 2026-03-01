const { builtinRules } = require('eslint/use-at-your-own-risk')

const pickRules = ruleNames =>
  Object.fromEntries(
    ruleNames
      .map(ruleName => [ruleName, builtinRules.get(ruleName)])
      .filter(([, rule]) => Boolean(rule)),
  )

module.exports = {
  meta: { name: 'eslint-core' },
  rules: pickRules(['no-restricted-exports', 'no-restricted-properties']),
}
