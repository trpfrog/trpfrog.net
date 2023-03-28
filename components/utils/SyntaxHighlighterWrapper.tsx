'use client';

import React from "react";
import SyntaxHighlighter, {SyntaxHighlighterProps} from "react-syntax-highlighter";

export default function SyntaxHighlighterWrapper(
  props: SyntaxHighlighterProps
) {
  return <SyntaxHighlighter {...props}/>
}
