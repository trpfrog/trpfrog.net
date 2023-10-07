import React from 'react'

import { Metadata } from 'next'

import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Blog Editor',
}

export default function Edit({ children }: { children: React.ReactNode }) {
  // Edit page is only available in development
  if (process.env.NODE_ENV === 'development') {
    return children
  } else {
    notFound()
  }
}
