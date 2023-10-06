// 'use client';
import { Metadata } from 'next'

import { MainWrapper } from '@/components/atoms/MainWrapper'

import { BalloonApp } from './BalloonApp'

export const metadata: Metadata = {
  title: 'Balloon',
  description: '🎈💥🎈💥🎈💥🎈💥🎈',
}

export default async function Index() {
  return (
    <MainWrapper>
      <BalloonApp />
    </MainWrapper>
  )
}
