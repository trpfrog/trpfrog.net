'use client';

import React from "react";

export default function EditButton({slug}: { slug: string }) {
  return (
    <a
      className={'linkButton'}
      onClick={() => fetch(`/api/posts/open/${slug}`)}
    >
      編集する
    </a>
  )
}
