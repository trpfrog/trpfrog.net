'use client'

import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript'
import sh from 'react-syntax-highlighter/dist/cjs/languages/hljs/shell'
import html from 'react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/hljs/yaml'
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css'
import scss from 'react-syntax-highlighter/dist/cjs/languages/hljs/scss'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('js', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('ts', typescript)
SyntaxHighlighter.registerLanguage('sh', sh)
SyntaxHighlighter.registerLanguage('shell', sh)
SyntaxHighlighter.registerLanguage('html', html)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('scss', scss)

export default SyntaxHighlighter
