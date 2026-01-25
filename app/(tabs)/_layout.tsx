import { colors } from "@/lib/colors";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center" ,
        headerStyle: { backgroundColor: colors.bg },
        headerTitleStyle: { color: colors.text },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: colors.border,
          height: 85,
        },
        headerStatusBarHeight:14,
        tabBarItemStyle:{paddingBottom:10},
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home"}}  // ✅ THIS WILL SHOW NOW
      />

     <Tabs.Screen
        name="recipes"
        options={{ title: "Recipes"}}  // ✅ THIS WILL SHOW NOW
      />

      <Tabs.Screen
        name="add"
        options={{ title: "Add Recipe"}}  // ✅ THIS WILL SHOW NOW
      />

      <Tabs.Screen
        name="planner"
        options={{ title: "Planner" }}
      />

      <Tabs.Screen
        name="shopping"
        options={{ title: "Shopping List" }}
      />
    </Tabs>
  );
}

