import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";
import { FlashList } from "@shopify/flash-list";
export default function CartScreen() {
  const { items, total } = useCart();

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
        estimatedItemSize={5}r
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: ${total}
      </Text>
      <Button title="Checkout" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
