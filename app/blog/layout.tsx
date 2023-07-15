import React from "react";
import {BadBlogStateProvider} from "@blog/_components/BadBlog";
import {UDFontStateProvider} from "@blog/_components/UDFontBlock";
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
