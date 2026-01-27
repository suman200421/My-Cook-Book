import CustomDrawer from "@/components/CustomDrawer";
import { DrawerProvider } from "@/components/DrawerContext";
import { RecipesProvider } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DrawerProvider>
        <CustomDrawer />
      <RecipesProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.bg },
            headerTitleStyle: { color: colors.text },
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          {/* Tabs handle their own header/footer */}
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          {/* Fullscreen pages */}
          <Stack.Screen name="recipe/[id]" />
          <Stack.Screen name="recipe/view/[id]" />
        </Stack>
      </RecipesProvider>
      </DrawerProvider>
    </SafeAreaProvider>
  );
}
