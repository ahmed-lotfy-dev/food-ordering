import {
  Link,
  Redirect,
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import products from "@/assets/data/products";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useState } from "react";
import Button from "@/src/components/Buton";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const router = useRouter();
  if (!product) return <Text>Product not found</Text>;

  const { addItem, items } = useCart();

  const addToCart = () => {
    if (!product) {
      return;
    }

    addItem(product, selectedSize);
    router.push("/cart");
  };
  console.log(items);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/`} asChild>
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
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>$ {product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  image: { width: "100%", aspectRatio: 1, objectFit: "cover" },
  title: { fontSize: 20, fontWeight: "bold" },
  price: { fontSize: 18 },
});
export default ProductDetailsScreen;
