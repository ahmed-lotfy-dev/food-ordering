import { ActivityIndicator, Dimensions } from "react-native"
import { View, Text } from "@/src/components/Themed"

import { FlashList } from "@shopify/flash-list"
import OrderListItem from "@/src/components/OrderListItem"
import { Stack } from "expo-router"
import { useEffect } from "react"
import { supabase } from "@/src/app/lib/supabase"
import { useAdminOrderList } from "@/src/api/orders"

export default function OrdersScreen() {
  useEffect(() => {
    const orders = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload)
        }
      )
      .subscribe()
    return () => {
      orders.unsubscribe()
    }
  }, [])

  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false })

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch</Text>
  }

  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        height: "100%",
      }}
    >
      <FlashList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        estimatedItemSize={5}
      />
    </View>
  )
}
