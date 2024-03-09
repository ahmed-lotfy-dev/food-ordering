import { FlashList } from "@shopify/flash-list"
import { ActivityIndicator } from "react-native"
import { View, Text } from "@/src/components/Themed"

import ProductListItem from "@/components/ProductListItem"

import { Dimensions } from "react-native"
import { useProductList } from "@/src/api/products"

export default function MenuScreen() {
  const { data: products, isLoading, error } = useProductList()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) return <Text>Failed to fetch products</Text>

  return (
    <View style={{ width: Dimensions.get("screen").width, height: "100%" }}>
      <FlashList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        estimatedItemSize={5}
      />
    </View>
  )
}
