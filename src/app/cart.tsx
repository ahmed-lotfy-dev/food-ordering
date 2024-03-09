import { Platform, Dimensions } from "react-native"
import { StatusBar } from "expo-status-bar"
import { View, Text } from "@/src/components/Themed"

import { useCart } from "../providers/CartProvider"
import CartListItem from "@/components/CartListItem"
import Button from "../components/Buton"
import { FlashList } from "@shopify/flash-list"

const CartScreen = () => {
  const { items, total, checkout } = useCart()

  return (
    <View
      style={{
        padding: 10,
        width: Dimensions.get("screen").width,
        height: "100%",
      }}
    >
      <FlashList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        estimatedItemSize={6}
      />

      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: ${total}
      </Text>
      <Button onPress={checkout} text="Checkout" />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  )
}

export default CartScreen
