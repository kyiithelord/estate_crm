import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#fff7eb" },
        headerTintColor: "#14213d",
        contentStyle: { backgroundColor: "#f7f3ea" }
      }}
    />
  );
}
