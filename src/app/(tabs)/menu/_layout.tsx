import { Stack, useLocalSearchParams } from "expo-router";

export default function MenuStack() {
  const { id } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}
