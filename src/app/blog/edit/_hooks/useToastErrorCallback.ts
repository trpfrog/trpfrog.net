import { useCallback } from 'react'
import toast from 'react-hot-toast'

export default function useToastErrorCallback() {
  return useCallback((errorMessage: string) => {
    console.error(errorMessage)
    toast.error(errorMessage, { duration: 6000 })
  }, [])
}
