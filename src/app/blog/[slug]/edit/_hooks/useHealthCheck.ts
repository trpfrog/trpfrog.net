import { useEffect } from 'react'

import toast from 'react-hot-toast'

import { healthCheck } from '@blog/[slug]/edit/_actions/healthCheck'

export function useHealthCheck(checkIntervalMs: number = 10000) {
  useEffect(() => {
    const interval = setInterval(() => {
      healthCheck().catch(() => {
        toast.error('Server is not running', {
          icon: '😭',
          duration: checkIntervalMs,
        })
      })
    }, checkIntervalMs)
    return () => clearInterval(interval)
  }, [checkIntervalMs])
}
