// 'use client';
import BalloonApp from './BalloonApp'
import { Metadata } from 'next'
import MainWrapper from '@/components/atoms/MainWrapper'

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
