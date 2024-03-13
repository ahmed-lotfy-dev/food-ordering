import { View, Text } from "@/src/components/Themed"

import { ActivityIndicator } from "react-native"
import { useOrderDetails } from "@/src/api/orders"
// import { useUpdateOrderSubscription } from "@/src/api/orders/subscriptions"
import OrderItemListItem from "@/components/OrderItemListItem"
import OrderListItem from "@/components/OrderListItem"
import { Stack, useLocalSearchParams } from "expo-router"
import { FlashList } from "@shopify/flash-list"
import { useUpdateOrderSubscription } from "@/src/api/orders/subscriptions"

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === "string" ? idString : idString[0])

  const { data: order, isLoading, error } = useOrderDetails(id)
  useUpdateOrderSubscription(id)
  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error || !order) {
    return <Text>Failed to fetch</Text>
  }

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlashList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        estimatedItemSize={6}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  )
}
