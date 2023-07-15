'use client';

import {createContext} from "react";
import {ReactMarkdownOptions} from "react-markdown/lib/react-markdown";

type ContextProp = {
  markdown: {
    options: Partial<ReactMarkdownOptions>
  }
}

const RendererContext = createContext<ContextProp>({
  markdown: {
    options: {}
  }
});

export default RendererContext;
