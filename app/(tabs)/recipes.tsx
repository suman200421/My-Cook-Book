import DrawerButton from "@/components/DrawerButton";
import { RecipeItem } from "@/components/RecipeItem";
import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { INGREDIENT_SUGGESTIONS } from "@/lib/ingredients";
import { matchRecipesByIngredients } from "@/lib/ingredientUtils";
import { Stack } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Recipe() {

  const { width } = useWindowDimensions();

  const numColumns =
    width < 360 ? 1 :
      width < 700 ? 2 :
        3;

  const { recipes, deleteRecipe } = useRecipes();

  const [search, setSearch] = useState('');

  const [categoryFilter, setCategoryFilter] = useState<
    "All"
    | "Main course"
    | "Dessert"
    | "Appetizer"
    | "Beverage"
    | "Salad"
    | "Soup"
    | "Snack"
    | "Bread"
    | "Sauce"
    | "Side dish"
    | "Breakfast"
    | "Other"
  >("All");

  const handleRemove = async (id: string) => {
    await deleteRecipe(id);
  };

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);


  const [findMode, setFindMode] = useState(false);
  const [ingredientQuery, setIngredientQuery] = useState("");

  const typedIngredients = ingredientQuery
    .split(",")
    .map((i) => i.trim().toLowerCase())
    .filter(Boolean);

  const allSelectedIngredients = Array.from(
    new Set([...selectedIngredients, ...typedIngredients])
  );


  const filteredRecipes = findMode
    ? matchRecipesByIngredients(recipes, allSelectedIngredients)
    : recipes.filter((recipe) => {
      const matchesText =
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        recipe.category === categoryFilter;

      return matchesText && matchesCategory;
    });


  const toggleIngredient = (ingredient: string) => {
    const normalized = ingredient.toLowerCase();

    setSelectedIngredients((prev) =>
      prev.includes(normalized)
        ? prev.filter((i) => i !== normalized)
        : [...prev, normalized]
    );
  };



  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <DrawerButton />,
          title: "Recipes",
        }}
      />
      <SafeAreaView
        edges={["left", "right", "bottom"]}
        style={{ flex: 1, backgroundColor: colors.bg }}>
        <View
          style={{
            flex: 1
          }}
        >

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.card,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: 12,
              height: 44,
              marginBottom: 8,
              //width:380,
            }}
          >
            <TextInput
              value={findMode ? ingredientQuery : search}
              onChangeText={findMode ? setIngredientQuery : setSearch}
              placeholder={
                findMode ? "Rice, onion, oil" : "Search recipes..."
              }
              placeholderTextColor={colors.sub}
              style={{
                flex: 1,
                color: colors.text,
                fontSize: 14,
              }}
            />

            {/* Divider */}
            <View
              style={{
                width: 1,
                height: 24,
                backgroundColor: colors.border,
                marginHorizontal: 8,
              }}
            />

            {/* Toggle button */}
            <Pressable
              onPress={() => {
                setFindMode((v) => !v);
                setSearch("");
                setIngredientQuery("");
              }}
            >
              <Text
                style={{
                  color: findMode ? colors.accent : colors.sub,
                  fontWeight: "700",
                  fontSize: 12,
                }}
              >
                {findMode ? "ING" : "TXT"}
              </Text>
            </Pressable>
          </View>


          {findMode && INGREDIENT_SUGGESTIONS?.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
                paddingHorizontal: 16,
                marginBottom: 12,
              }}
            >
              {INGREDIENT_SUGGESTIONS.map((ingredient) => {
                const selected = selectedIngredients.includes(
                  ingredient.toLowerCase()
                );

                return (
                  <Pressable
                    key={ingredient}
                    onPress={() => toggleIngredient(ingredient)}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: selected ? colors.accent : colors.card,
                      borderWidth: 1,
                      borderColor: selected ? colors.accent : colors.border,
                    }}
                  >
                    <Text
                      style={{
                        color: selected ? "#fff" : colors.text,
                        fontWeight: "600",
                        fontSize: 13,
                      }}
                    >
                      {ingredient}
                    </Text>
                  </Pressable>
                );
              })}

            </View>
          )}

          <View>
            {!findMode && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 4,
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {["All", "Main course", "Dessert", "Appetizer", "Beverage", "Salad", "Soup", "Snack", "Bread", "Sauce", "Side dish", "Breakfast", "Other"].map((food) => (
                  <Pressable
                    key={food}
                    onPress={() => setCategoryFilter(food as any)}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor:
                        categoryFilter === food ? colors.accent : colors.card,
                      borderWidth: 1,
                      borderColor: colors.border,
                    }}
                  >
                    <Text
                      style={{
                        color: categoryFilter === food ? "#fff" : colors.text,
                        fontWeight: "600",
                      }}
                    >
                      {food}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>


          <FlatList
            data={filteredRecipes}
            numColumns={numColumns}
            key={numColumns}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              alignItems: "flex-start", // 🔒 THIS fixes last row
              paddingHorizontal: 5,
              paddingTop: 8,
              paddingBottom: 100,
            }}
            columnWrapperStyle={{ justifyContent: "flex-start" }}
            renderItem={({ item }) => (
              <View style={{ marginRight: 12, marginBottom: 14 }}>
                <RecipeItem item={item} onRemove={handleRemove} />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
}