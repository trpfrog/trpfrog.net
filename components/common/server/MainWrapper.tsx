import React from "react";

export default function MainWrapper(props: {children: React.ReactNode}) {
  return (
    <div id="main_wrapper">
      {props.children}
    </div>
  )
}
