import { View, Text } from "@/src/components/Themed"
import { TextInput, StyleSheet, Alert } from "react-native"
import React, { useState } from "react"
import Button from "@/src/components/Buton"
import Colors from "../../constants/Colors"
import { Link, Stack } from "expo-router"
import { supabase } from "../lib/supabase"

const SignInScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const onSigninHandler = async () => {
    console.log({ email, password })
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log({ data })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  const googleSigninHandler = async () => {
    console.warn("google signin pressed")
    const data = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "/" },
    })
    console.log(data)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />

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
        text={loading ? "Signing in..." : "Sign in"}
        disabled={loading}
        onPress={onSigninHandler}
      />
      <Link href="/sign-up" style={styles.textButton}>
        Create an account
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

export default SignInScreen
