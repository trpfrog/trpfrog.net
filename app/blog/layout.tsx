import React from "react";
import {BadBlogStateProvider} from "../../components/blog/BadBlogButton";
import {UDFontStateProvider} from "../../components/blog/UDFontButton";

export default function BlogLayout({children}: { children: React.ReactNode }) {
  return (
    <BadBlogStateProvider>
      <UDFontStateProvider>
        {children}
      </UDFontStateProvider>
    </BadBlogStateProvider>
  )
}
