import React from "react";
import {BadBlogStateProvider} from "../../components/blog/BadBlogButton";
import {UDFontStateProvider} from "../../components/blog/UDFontBlock";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: {
    default: 'つまみログ',
    template: '%s - つまみログ',
  },
}

export default function BlogLayout({children}: { children: React.ReactNode }) {
  return (
    <BadBlogStateProvider>
      <UDFontStateProvider>
        {children}
      </UDFontStateProvider>
    </BadBlogStateProvider>
  )
}
