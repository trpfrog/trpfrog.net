// https://zenn.dev/chot/articles/web-push-with-microcms-and-fcm

import { useCallback, useEffect, useState } from "react";
import {requestNotificationPermission} from "@/firebase/client";

type NotificationPermissionWithSSR = NotificationPermission | "not-supported";

export default function useNotification() {
  const [permission, setPermission] = useState<NotificationPermissionWithSSR>("default");

  const revalidate = useCallback(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    } else {
      setPermission("not-supported");
    }
  }, []);

  useEffect(() => {
    revalidate();
  }, [revalidate]);

  const [isRequesting, setIsRequesting] = useState(false);

  const requestPermission = useCallback(() => {
    if (window == null) return;
    setIsRequesting(true);
    requestNotificationPermission()
      .then(() => revalidate())
      .finally(() => setIsRequesting(false));
  }, [revalidate]);

  return { permission, requestPermission, isRequesting };
}
