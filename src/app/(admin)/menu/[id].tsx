import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router"
import { StyleSheet, Pressable, ActivityIndicator } from "react-native"
import { View, Text } from "@/src/components/Themed"
import { defaultPizzaImage } from "@/src/components/ProductListItem"
import { useCart } from "@/src/providers/CartProvider"
import { PizzaSize } from "@/src/types"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/src/constants/Colors"
import { useProduct } from "@/src/api/products"
import RemoteImage from "@/src/components/RemoteImage"

const sizes: PizzaSize[] = ["S", "M", "L", "XL"]

const ProductDetailsScreen = () => {
  const router = useRouter()
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === "string" ? idString : idString[0])
  const { data: product, error, isLoading } = useProduct(id)
  console.log({ product }, "from inside the use product query function")
  console.log(product)

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error || !product) {
    return <Text>Failed to fetch product</Text>
  }

  if (!product) return <Text>Product not found</Text>
  console.log(product.image)
  console.log(product)
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product.name }} />

      <RemoteImage
        fallback={defaultPizzaImage}
        path={product.image}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>$ {product.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  image: { width: "100%", aspectRatio: 1, objectFit: "cover" },
  title: { fontSize: 20, fontWeight: "bold" },
  price: { fontSize: 18 },
})
export default ProductDetailsScreen
