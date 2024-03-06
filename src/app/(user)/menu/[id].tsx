import { Redirect, Stack, useLocalSearchParams, useRouter } from "expo-router"
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native"
import { defaultPizzaImage } from "@/src/components/ProductListItem"
import { useState } from "react"
import Button from "@/src/components/Buton"
import { useCart } from "@/src/providers/CartProvider"
import { PizzaSize } from "@/src/types"
import { useProduct } from "@/src/api/products"
import { supabase } from "../../lib/supabase"
import RemoteImage from "@/src/components/RemoteImage"

const sizes: PizzaSize[] = ["S", "M", "L", "XL"]

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")
  const router = useRouter()
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === "string" ? idString : idString[0])
  const { data: product, isLoading, error } = useProduct(id)

  const { addItem, items } = useCart()

  const addToCart = () => {
    if (!product) {
      return
    }
    if (isLoading) {
      return <ActivityIndicator />
    }
    if (error || !product) {
      return <Text>Failed to fetch product</Text>
    }

    if (!product) return <Text>Product not found</Text>

    addItem(product, selectedSize)
    router.push("/cart")
  }

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error || !product) {
    return <Text>Failed to fetch product</Text>
  }

  if (!product) return <Text>Product not found</Text>

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage
        fallback={defaultPizzaImage}
        path={product.image}
        style={styles.image}
        resizeMode="contain"
      />

      <Text>Select size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
            key={size}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={[
                styles.styleText,
                { color: selectedSize === size ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>$ {product.price}</Text>
      <Button text="Add To Cart" onPress={addToCart} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  image: { width: "100%", aspectRatio: 1, objectFit: "cover" },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  styleText: { fontSize: 20, fontWeight: "500" },
  price: { fontSize: 18, fontWeight: "bold", marginTop: "auto" },
})
export default ProductDetailsScreen
