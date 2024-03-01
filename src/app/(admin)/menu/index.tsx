import { FlashList } from "@shopify/flash-list";

import { View } from "@/components/Themed";
import ProductListItem from "@/components/ProductListItem";

import products from "@/assets/data/products";
import { Stack } from "expo-router";
import { Dimensions } from "react-native";
import { FullWindowOverlay } from "react-native-screens";

export default function MenuScreen() {
  return (
    <View style={{ width: Dimensions.get("screen").width, height: "100%" }}>
      <Stack.Screen options={{ title: "Menu" }} />
      <FlashList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        estimatedItemSize={5}
      />
    </View>
  );
}
