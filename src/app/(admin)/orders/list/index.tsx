import { Dimensions, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { FlashList } from "@shopify/flash-list";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack } from "expo-router";

export default function TabTwoScreen() {
  const newOrders = orders.filter((o) => o.status === "New");

  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        height: "100%",
      }}
    >
      <Stack.Screen options={{ title: "New" }} />

      <FlashList
        data={newOrders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        estimatedItemSize={5}
      />
    </View>
  );
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
});
