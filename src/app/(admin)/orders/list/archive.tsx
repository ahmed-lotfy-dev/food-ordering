import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  Text,
} from "react-native"

import { FlashList } from "@shopify/flash-list"
import orders from "@/assets/data/orders"
import OrderListItem from "@/src/components/OrderListItem"
import { Stack } from "expo-router"
import { useAdminOrderList } from "@/src/api/orders"

export default function TabTwoScreen() {
  const {
    data: Archived,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true })

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
      <Stack.Screen options={{ title: "Archived" }} />

      <FlashList
        data={Archived}
        renderItem={({ item }) => <OrderListItem order={item} />}
        estimatedItemSize={5}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
