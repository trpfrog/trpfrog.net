'use client'

import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css'
import html from 'react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import scss from 'react-syntax-highlighter/dist/cjs/languages/hljs/scss'
import sh from 'react-syntax-highlighter/dist/cjs/languages/hljs/shell'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/hljs/yaml'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('js', javascript)
SyntaxHighlighter.registerLanguage('jsx', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('ts', typescript)
SyntaxHighlighter.registerLanguage('tsx', typescript)
SyntaxHighlighter.registerLanguage('sh', sh)
SyntaxHighlighter.registerLanguage('shell', sh)
SyntaxHighlighter.registerLanguage('html', html)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('scss', scss)

export default SyntaxHighlighter
