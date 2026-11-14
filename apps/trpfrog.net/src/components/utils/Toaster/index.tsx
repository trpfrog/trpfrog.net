'use client'

import { Toast, ToastDescription, ToastRegion, ToastTitle } from '@ui-sdk/react/toast'

import styles from './index.module.css'

export function Toaster() {
  return (
    <ToastRegion side="top" align="center" aria-label="通知" className={styles.region}>
      {() => (
        <Toast className={styles.toast}>
          <ToastTitle className={styles.title} />
          <ToastDescription />
        </Toast>
      )}
    </ToastRegion>
  )
}
