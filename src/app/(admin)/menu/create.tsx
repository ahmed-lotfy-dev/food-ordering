import Button from "@/src/components/Buton";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const CreateProductScreen = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState("");

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const onValidateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!onValidateInput()) {
      return;
    }

    console.warn("Creating product");
    resetFields();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {image && (
        <Image source={{ uri: defaultPizzaImage }} style={styles.image} />
      )}
      <Text style={styles.textButton} onPress={pickImage}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="9.99"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text="Create" onPress={onCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: { color: "gray", fontSize: 16 },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: { width: "50%", aspectRatio: 1, alignSelf: "center" },
  textButton: {
    color: Colors.light.tint,
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10,
  },
});
export default CreateProductScreen;
