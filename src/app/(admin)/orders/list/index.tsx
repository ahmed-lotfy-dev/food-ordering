import { ActivityIndicator, Dimensions } from "react-native"
import { View, Text } from "@/src/components/Themed"

import { FlashList } from "@shopify/flash-list"
import OrderListItem from "@/src/components/OrderListItem"
import { useAdminOrderList } from "@/src/api/orders"
import { useInsertOrderSubscription } from "@/src/api/orders/subscriptions"

export default function OrdersScreen() {
  useInsertOrderSubscription()

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
