import { RecipeItem } from "@/components/RecipeItem";
import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Recipe() {

  const { width } = useWindowDimensions();

  const numColumns =
    width < 360 ? 1 :
    width < 700 ? 2 :
    3;

  const { recipes, deleteRecipe} = useRecipes();

  const[search, setSearch]= useState('');

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

  const filteredRecipes = recipes.filter((recipe) =>{
    const matchesText=
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || recipe.category === categoryFilter;

    return matchesText && matchesCategory;
});


  return (
    <SafeAreaView 
    edges={["left","right","bottom"]}
    style={{flex:1,backgroundColor:colors.bg}}>
    <View
      style={{
        flex: 1
      }}
    >

      <View
        style={{
          marginHorizontal: 16,
          marginTop: 12,
          marginBottom: 4,
          backgroundColor: colors.card,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: 12,
        }}
      >
        <TextInput
          placeholder="Search recipes..."
          placeholderTextColor={colors.sub}
          value={search}
          onChangeText={setSearch}
          style={{
            height: 44,
            color: colors.text,
            fontSize: 14,
            marginHorizontal:16,
            //fontWeight: '500',
          }}
        />
      </View>
      <View>
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
      </View>


      <Link href={'/recipe/new'} asChild>
        <Text style={{
        alignSelf:'flex-end',
        paddingHorizontal: 14,
        paddingVertical:10,
        borderRadius:12,
        backgroundColor: colors.accent,
        color:'#fff',
        fontWeight:'600',
        overflow:"hidden",
        marginRight:12,
        marginTop:8
      }}>
        Add Recipes
      </Text>
      </Link>
      <FlatList
        data={filteredRecipes}
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          alignItems: "flex-start", // 🔒 THIS fixes last row
          paddingHorizontal: 5,
          paddingTop:8,
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
  );
}