import { Stack } from "expo-router";
import { DataProvider } from "./data";

export default function RootLayout() {
  return (
    <DataProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#fff7eb" },
          headerTintColor: "#14213d",
          contentStyle: { backgroundColor: "#f7f3ea" }
        }}
      />
    </DataProvider>
  );
}
