import { Text, ActivityIndicator } from "react-native"
import OrderListItem from "@/components/OrderListItem"
import { useMyOrderList } from "@/src/api/orders"
import { FlashList } from "@shopify/flash-list"
import { useInsertOrderSubscription } from "@/src/api/orders/subscriptions"

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList()
  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch</Text>
  }

  return (
    <FlashList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      estimatedItemSize={6}
    />
  )
}
