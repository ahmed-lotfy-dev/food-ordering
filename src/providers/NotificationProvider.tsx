import { registerForPushNotificationsAsync } from "@/src/app/lib/notifications"
import { ExpoPushToken } from "expo-notifications"
import { PropsWithChildren, useEffect, useRef, useState } from "react"
import * as Notifications from "expo-notifications"
import { supabase } from "../app/lib/supabase"
import { useAuth } from "./AuthProvider"

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>()
  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  const { session } = useAuth()
  const userId = session?.user.id

  const savePushToken = async (
    newToken: string | undefined,
    userId: string
  ) => {
    if (!newToken) {
      return
    }
    setExpoPushToken(newToken)
    await supabase
      .from("profiles")
      .update({ expo_push_token: newToken })
      .eq("id", userId)
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (!userId) return
      savePushToken(token, userId)
    })

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  console.log(notification)
  console.log(expoPushToken)

  return <>{children}</>
}

export default NotificationProvider
