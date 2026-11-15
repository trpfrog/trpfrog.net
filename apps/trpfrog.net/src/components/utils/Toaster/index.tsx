'use client'

import {
  Toast,
  ToastDescription,
  ToastRegion,
  ToastTitle,
  type ToastType,
} from '@ui-sdk/react/toast'

import styles from './index.module.css'

const TYPE_ICONS: Partial<Record<ToastType, string>> = {
  success: '✅',
  error: '⚠️',
  loading: '⏳',
}

export function Toaster() {
  return (
    <ToastRegion side="top" align="center" aria-label="通知" className={styles.region}>
      {toast => {
        const icon = TYPE_ICONS[toast.type]
        return (
          <Toast className={styles.toast}>
            <ToastTitle className={styles.title}>
              {icon && <span aria-hidden>{icon} </span>}
              {toast.title}
            </ToastTitle>
            <ToastDescription />
          </Toast>
        )
      }}
    </ToastRegion>
  )
}
