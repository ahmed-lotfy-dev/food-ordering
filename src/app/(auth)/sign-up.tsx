import { View, Text, TextInput, StyleSheet, Alert } from "react-native"
import React, { useState } from "react"
import Button from "@/src/components/Buton"
import Colors from "../../constants/Colors"
import { Link, Redirect, Stack, router } from "expo-router"
import { supabase } from "../lib/supabase"

const SignUpScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const onSignUpHandler = async () => {
    console.log({ email, password })
    const { data, error } = await supabase.auth.signUp({ email, password })
    console.log(data)
    if (error) Alert.alert(error.message)
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button
        text={loading ? "Creating Account..." : "Create Account"}
        disabled={loading}
        onPress={onSignUpHandler}
      />
      <Link href="/sign-in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
})

export default SignUpScreen
