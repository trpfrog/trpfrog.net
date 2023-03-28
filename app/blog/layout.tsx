import React from "react";
import {BadBlogStateProvider} from "../../components/blog/BadBlogButton";
import {UDFontStateProvider} from "../../components/blog/UDFontBlock";
import {MathJaxContextWrapper, MathJaxWrapper} from "../../components/utils/MathJaxWrapper";

export default function BlogLayout({children}: { children: React.ReactNode }) {
  const mathjaxConfig = {
    loader: {load: ["[tex]/html"]},
    tex: {
      packages: {"[+]": ["html"]},
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]]
    }
  };
  return (
    <BadBlogStateProvider>
      <UDFontStateProvider>
        <MathJaxContextWrapper version={3} config={mathjaxConfig}>
          {children}
        </MathJaxContextWrapper>
      </UDFontStateProvider>
    </BadBlogStateProvider>
  )
}
