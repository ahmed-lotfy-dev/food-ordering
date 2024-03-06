import { Pressable, StyleSheet } from "react-native"
import { Text } from "./Themed"
import Colors from "@/constants/Colors"
import { Tables } from "../types"
import { Link, useSegments } from "expo-router"
import RemoteImage from "./RemoteImage"

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"

type ProductListItemProps = {
  product: Tables<"products">
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const segments = useSegments()

  return (
    // @ts-ignore
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          fallback={defaultPizzaImage}
          path={product.image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    color: Colors.light.text,
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
})
