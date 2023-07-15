import React from "react";
import {Metadata} from "next";
import MainWrapper from "@/components/MainWrapper";

export const metadata: Metadata = {
  title: 'つまみのうた',
  description: 'ねぎ一世さん作曲「つまみのうた」の歌詞',
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
