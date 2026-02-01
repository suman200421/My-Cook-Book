import { Stack } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { mergeIngredients } from "@/lib/groceryUtils";
import { Recipe } from "@/types";


export default function Shopping() {
  const { recipes } = useRecipes();

  const [query, setQuery] = useState("");
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleChecked = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const searchedRecipes: Recipe[] =
    query.trim().length === 0
      ? []
      : recipes.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase())
      );

  const toggleRecipe = (id: string) => {
    setShowList(false);
    setCheckedItems([]);

    setSelectedRecipeIds((prev) =>
      prev.includes(id)
        ? prev.filter((r) => r !== id)
        : [...prev, id]
    );
  };

  const groceryItems = mergeIngredients(
    recipes
      .filter((r) => selectedRecipeIds.includes(r.id))
      .flatMap((r) => r.ingredients.split(","))
  );

  return (
    <>
      <Stack.Screen options={{ title: "Grocery" }} />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.bg }}
        edges={["left", "right", "bottom"]}
      >
        <View style={{ padding: 16, flex: 1 }}>
          {/* SEARCH BAR */}
          <TextInput
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              setShowList(false);      
              setCheckedItems([]);
            }}
            placeholder="Search recipe to add..."
            placeholderTextColor={colors.sub}
            style={{
              backgroundColor: colors.card,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: 14,
              paddingVertical: 12,
              color: colors.text,
              marginBottom: 12,
            }}
          />

          {/* RECIPE SEARCH RESULTS */}
          {!showList && (
            <FlatList<Recipe>
              data={searchedRecipes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const selected = selectedRecipeIds.includes(item.id);

                return (
                  <Pressable
                    onPress={() => toggleRecipe(item.id)}
                    style={{
                      padding: 12,
                      marginBottom: 8,
                      borderRadius: 12,
                      backgroundColor: selected
                        ? colors.accent + "22"
                        : colors.card,
                      borderWidth: 1,
                      borderColor: selected
                        ? colors.accent
                        : colors.border,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        color: colors.text,
                      }}
                    >
                      {item.title}
                    </Text>
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                query.length > 0 ? (
                  <Text style={{ color: colors.sub, marginTop: 8 }}>
                    No recipes found
                  </Text>
                ) : null
              }
            />
          )}

          {/* GENERATE BUTTON */}
          {!showList && selectedRecipeIds.length > 0 && (
            <Pressable
              onPress={() => setShowList(true)}
              style={{
                marginTop: 16,
                paddingVertical: 14,
                borderRadius: 14,
                backgroundColor: colors.accent,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                Generate Grocery List
              </Text>
            </Pressable>
          )}

          {/* GROCERY LIST */}
          {showList && (
            <View style={{ marginTop: 8 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 12,
                  color: colors.text,
                }}
              >
                Grocery List
              </Text>

              {groceryItems.map((item) => {
                const checked = checkedItems.includes(
                  `${item.name}-${item.unit}`
                );

                return (
                  <Pressable
                    key={`${item.name}-${item.unit}`}
                    onPress={() =>
                      toggleChecked(`${item.name}-${item.unit}`)
                    }
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderColor: colors.border,
                    }}
                  >
                    <View
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: checked ? colors.accent : colors.sub,
                        backgroundColor: checked ? colors.accent : "transparent",
                        marginRight: 12,
                      }}
                    />

                    <Text
                      style={{
                        color: checked ? colors.sub : colors.text,
                        textDecorationLine: checked ? "line-through" : "none",
                      }}
                    >
                      {item.quantity} {item.unit} {item.name}
                    </Text>
                  </Pressable>
                );
              })}




              <Pressable
                onPress={() => {
                  setShowList(false);
                  setSelectedRecipeIds([]);
                  setCheckedItems([]); // ⭐ RESET CHECKED INGREDIENTS
                  setQuery("");
                }}
                style={{
                  marginTop: 20,
                  paddingVertical: 12,
                  borderRadius: 12,
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                  alignItems: "center",
                }}
              >

                <Text style={{ color: colors.text, fontWeight: "600" }}>
                  ← Back to recipe search
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
