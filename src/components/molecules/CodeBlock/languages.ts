import sh from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import html from 'react-syntax-highlighter/dist/cjs/languages/prism/markup'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-light'

export function registerLanguages() {
  SyntaxHighlighter.registerLanguage('javascript', javascript)
  SyntaxHighlighter.registerLanguage('js', javascript)
  SyntaxHighlighter.registerLanguage('jsx', jsx)
  SyntaxHighlighter.registerLanguage('json', json)
  SyntaxHighlighter.registerLanguage('typescript', typescript)
  SyntaxHighlighter.registerLanguage('ts', typescript)
  SyntaxHighlighter.registerLanguage('tsx', tsx)
  SyntaxHighlighter.registerLanguage('java', java)
  SyntaxHighlighter.registerLanguage('sh', sh)
  SyntaxHighlighter.registerLanguage('shell', sh)
  SyntaxHighlighter.registerLanguage('html', html)
  SyntaxHighlighter.registerLanguage('yaml', yaml)
  SyntaxHighlighter.registerLanguage('css', css)
  SyntaxHighlighter.registerLanguage('scss', scss)
  SyntaxHighlighter.registerLanguage('markdown', markdown)
  SyntaxHighlighter.registerLanguage('md', markdown)
}
