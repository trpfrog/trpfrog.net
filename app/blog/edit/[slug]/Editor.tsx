'use client';

import "easymde/dist/easymde.min.css";
import React, {useCallback, useState} from "react";
import {useSparseCallback} from "@/lib/hooks";

import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

export default function Editor(props: { rawMarkdown: string, setPost: ((value: string) => void) }) {
  const onClick = useSparseCallback(useCallback((value: string) => {
    props.setPost(value)
  }, [props]), 1000)

  return (
    <>
      <SimpleMDE
        value={props.rawMarkdown}
        onChange={onClick}
      />
    </>
  )
}
