import { StatusBar } from "expo-status-bar";
import { Text, View, Platform, StyleSheet, Button } from "react-native";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";
import { FlashList } from "@shopify/flash-list";
export default function CartScreen() {
  const { items, total } = useCart();

  return (
    <View style={{ padding: 10 }}>
      <FlashList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: ${total}
      </Text>
      <Button title="Checkout" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
