import React from "react";
import ReturnButton from "./ReturnButton";

type Props = {
  children: React.ReactNode
}

export default function RootLayout({children}: Props) {
  return (
    <div id="main_wrapper">
      {children}
      <ReturnButton/>
    </div>
  )
}
