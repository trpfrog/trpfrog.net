// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-classnames', 'prettier-plugin-merge'],
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  arrowParens: 'avoid',
  tailwindFunctions: ['tv'],
  printWidth: 100,
}

module.exports = config
