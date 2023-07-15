import {Metadata} from "next";
import React from "react";
import MainWrapper from "@/components/MainWrapper";

export const metadata: Metadata = {
  title: 'fuzzy',
  description: 'あいまい URL リダイレクト'
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({children}: Props) {
  return (
    <MainWrapper>
      {children}
    </MainWrapper>
  )
}
