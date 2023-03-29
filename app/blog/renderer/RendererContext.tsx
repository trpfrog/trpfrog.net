'use client';

import {createContext} from "react";
import {ReactMarkdownOptions} from "react-markdown/lib/react-markdown";

const RendererContext = (
  createContext<Partial<ReactMarkdownOptions & {
    debugStr: string
  }>>({
    debugStr: 'not initialized',
  })
);

export default RendererContext;
