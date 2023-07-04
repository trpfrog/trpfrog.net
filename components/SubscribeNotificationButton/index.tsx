'use client'

import React from 'react'
import useNotification from "./useNotification";

export default function PushNotificationButton(props: {
  children?: React.ReactNode,
  onClick?: () => void,
  disabled?: boolean
}) {
  // To enable push notification, you need to get permission from user.
  // https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission

  const {
    permission,
    requestPermission,
    isRequesting,
  } = useNotification()

  return permission === 'default' ? (
    <button
      className={'linkButton'}
      onClick={requestPermission}
      disabled={props.disabled}
    >
      通知を受け取る
    </button>
  ) : permission === 'not-supported' ? (
    <button className={'linkButton'} disabled={true}>
      通知はサポートされていません
    </button>
  ) : isRequesting ? (
    <button className={'linkButton'} disabled={true}>
      リクエスト中...
    </button>
  ) : (
    <button className={'linkButton'} disabled={true}>
      通知を{
        permission === 'granted' ? '受け取る' : '拒否する'
      }設定になっています
    </button>
  )
}
