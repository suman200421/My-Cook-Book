import { colors } from "@/lib/colors";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
  <SafeAreaProvider>
  <Stack 
  screenOptions={{
    headerStyle: {backgroundColor : colors.bg},
    headerTitleStyle: {color : colors.text},
    contentStyle: {backgroundColor : colors.bg}
  }}
  />
  </SafeAreaProvider>
  );
}
