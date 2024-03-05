import { Dimensions, StyleSheet } from "react-native"

import { View } from "@/components/Themed"
import { FlashList } from "@shopify/flash-list"
import orders from "@/assets/data/orders"
import OrderListItem from "@/src/components/OrderListItem"
import { Stack } from "expo-router"

export default function TabTwoScreen() {
  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        height: "100%",
      }}
    >
      <Stack.Screen options={{ title: "Orders" }} />

      <FlashList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        estimatedItemSize={5}
      />
    </View>
  )
}
