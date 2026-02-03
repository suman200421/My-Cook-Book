import { colors } from "@/lib/colors";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";



export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center" ,
        headerStyle: { backgroundColor: colors.bg },
        headerTitleStyle: { color: colors.text },
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
        },
        headerStatusBarHeight:14,
        tabBarItemStyle:{paddingBottom:10},
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ 
          title: "Home",
          tabBarIcon:({color,size})=>(
            <FontAwesome5 name="home" size={24} color="black" />
          ),
        }}
      />

     <Tabs.Screen
        name="recipes"
        options={{ title: "Recipes",
          tabBarIcon:({color,size})=>(
            <MaterialCommunityIcons name="food-turkey" size={30} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.accent,
                alignItems: "center",
                justifyContent: "center",
                marginTop:8,
              }}
            >
              <Ionicons
                name="add"
                size={30}
                color="#FFFFFF"
              />
            </View>
          ),
        }}
        listeners={{tabPress:(e)=>{
          e.preventDefault();
          router.push("/recipe/new");
        }}}
      />



      <Tabs.Screen
        name="planner"
        options={{ title: "Planner",
          tabBarIcon:({color,size})=>(
            <FontAwesome name="calendar" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="shopping"
        options={{ title: "Grocery",
          tabBarIcon:({color,size})=>(
            <FontAwesome name="shopping-basket" size={24} color="black" />
          )
         }}
      />
    </Tabs>
  );
}

