import ActionCard from "@/components/ActionCard";
import DrawerButton from "@/components/DrawerButton";
import { colors } from "@/lib/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <DrawerButton />,
          title: "Recipes",
        }}
      />
      <SafeAreaProvider
        style={{
          backgroundColor:colors.bg
        }}
      >
      <ScrollView>
        <View>
          <Text
            style={{
              fontSize: 26,          // BIG
              fontWeight: "800",     // BOLD
              letterSpacing: 0.4,
              color: colors.text,
              marginBottom: 12,
            }}
          >
            QuickLinks to your recipes
          </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

          <ActionCard title="Fave" onPress={() => {
            router.push({
              pathname: "/(tabs)/recipes",
              params: { mode: "favorites" }
            });
          }} icon={<MaterialIcons name="favorite" size={24} color="#A1887F" />} />

          <ActionCard title="Quick" onPress={() => {
            router.push({
              pathname: "/(tabs)/recipes",
              params: { mode: "quick" }
            });
          }} icon={<MaterialIcons name="flash-on" size={24} color="#A1887F" />} />

          <ActionCard title="Vegan" icon={<MaterialIcons name="eco" size={24} color="#A1887F" />} />
          <ActionCard title="Dessert" icon={<MaterialIcons name="cake" size={24} color="#A1887F" />} />
          <ActionCard title="Healthy" icon={<MaterialIcons name="health-and-safety" size={24} color="#A1887F" />} />
          <ActionCard title="Italian" icon={<MaterialIcons name="local-pizza" size={24} color="#A1887F" />} />
          <ActionCard title="Asian" icon={<MaterialIcons name="ramen-dining" size={24} color="#A1887F" />} />
          <ActionCard title="Breakfast" icon={<MaterialIcons name="free-breakfast" size={24} color="#A1887F" />} />
        </ScrollView>

      </ScrollView>
      </SafeAreaProvider>
    </>
  );
}