import React from "react";
import {BadBlogStateProvider} from "../../components/blog/BadBlog";
import {UDFontStateProvider} from "../../components/blog/UDFontBlock";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: {
    absolute: 'つまみログ',
    template: '%s - つまみログ',
  },
}

type Props = {
  children: React.ReactNode
}

export default function BlogLayout({children}: Props) {
  return (
    <BadBlogStateProvider>
      <UDFontStateProvider>
        {children}
      </UDFontStateProvider>
    </BadBlogStateProvider>
  )
}
