import { RecipesProvider } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
  <SafeAreaProvider>
    <RecipesProvider>
    <Stack 
      screenOptions={{
      headerStyle: {backgroundColor : colors.bg},
      headerTitleStyle: {color : colors.text},
      contentStyle: {backgroundColor : colors.bg}
      }}
    >
      <Stack.Screen 
        name="welcome" 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name="index" 
        options={{title: "Recipes"}}
      />
    </Stack>
    </RecipesProvider>
  </SafeAreaProvider>
  );
}