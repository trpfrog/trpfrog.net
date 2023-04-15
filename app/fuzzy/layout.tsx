import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'fuzzy',
  description: 'あいまい URL リダイレクト'
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({children}: Props) {
  return (
    <div id="main_wrapper">
      {children}
    </div>
  )
}
