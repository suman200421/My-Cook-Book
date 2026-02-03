import ActionCard from "@/components/ActionCard";
import DrawerButton from "@/components/DrawerButton";
import { RecipeItem } from "@/components/RecipeItem";
import { TodaysSpecialFrame } from "@/components/TodaysSpecialFrame";
import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Recipe } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Home() {
  const { recipes } = useRecipes();

  const [dailyRecipe, setDailyRecipe] = useState<Recipe | null>(null);
  const [wrapped, setWrapped] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDailyRecipe = async () => {
      if (recipes.length === 0) return;

      const today = new Date().toISOString().split("T")[0];

      const storedDate = await AsyncStorage.getItem("dailyDate");
      const storedRecipeId = await AsyncStorage.getItem("dailyRecipeId");
      const unwrapped = await AsyncStorage.getItem("dailyUnwrapped");

      if (storedDate === today && storedRecipeId) {
        const recipe = recipes.find(r => r.id === storedRecipeId);
        if (recipe) {
          setDailyRecipe(recipe);
          setWrapped(unwrapped !== "true");
          setLoading(false);
          return;
        }
      }

      const random =
        recipes[Math.floor(Math.random() * recipes.length)];

      await AsyncStorage.multiSet([
        ["dailyDate", today],
        ["dailyRecipeId", random.id],
        ["dailyUnwrapped", "false"],
      ]);

      setDailyRecipe(random);
      setWrapped(true);
      setLoading(false);
    };

    loadDailyRecipe();
  }, [recipes]);


  const unwrapRecipe = async () => {
    await AsyncStorage.setItem("dailyUnwrapped", "true");
    setWrapped(false);
  };




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
          backgroundColor: colors.bg
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
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading || !dailyRecipe ? null : (
              <View style={{ alignItems: "center", marginTop: 20 }}>

                {wrapped ? (
                  // 🎁 WRAPPER
                  <Pressable
                    onPress={unwrapRecipe}
                    style={{
                      width: 350,
                      height: 290,
                      borderRadius: 20,
                      backgroundColor: colors.card,
                      borderWidth: 2,
                      borderColor: colors.accent,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 48 }}>🎁</Text>
                    <Text
                      style={{
                        marginTop: 12,
                        fontWeight: "700",
                        color: colors.text,
                      }}
                    >
                      Today’s Pick
                    </Text>
                    <Text style={{ color: colors.sub, marginTop: 4 }}>
                      Tap to unwrap
                    </Text>
                  </Pressable>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TodaysSpecialFrame>
                    <RecipeItem
                      item={dailyRecipe}
                      onRemove={() => { }}
                      onPress={() =>
                        router.push(`/recipe/view/${dailyRecipe.id}`)
                      }
                    />
                    </TodaysSpecialFrame>
                  </View>
                )}
              </View>
            )}
        </View>


        </ScrollView>
      </SafeAreaProvider>
    </>
  );
}