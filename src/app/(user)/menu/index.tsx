import { View, Text } from "@/src/components/Themed"

import { ActivityIndicator, Dimensions, Button } from "react-native"
import { FlashList } from "@shopify/flash-list"
import ProductListItem from "@/components/ProductListItem"
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
