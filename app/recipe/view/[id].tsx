import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ViewRecipe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { recipes } = useRecipes();

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <Text style={{ padding: 16 }}>Recipe not found</Text>;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Stack.Screen
        options={{
          title: recipe.title,
        }}
      />

      {/* Title */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10}}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "700",
          color: colors.text,
          marginBottom: 16,
        }}
      >
        {recipe.title}
      </Text>

      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: colors.border,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <Text style={{ color: colors.sub, fontSize: 18, fontWeight: "600" }}>
          {recipe.category}
        </Text>
      </View>
      </View>

      {/* Ingredients Card */}
      <View
        style={{
          backgroundColor: colors.card,
          padding: 14,
          borderRadius: 14,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.sub,
            marginBottom: 8,
          }}
        >
          Ingredients
        </Text>

        <Text style={{ color: colors.text, lineHeight: 22 }}>
          {recipe.ingredients}
        </Text>
      </View>

      {/* Recipe Steps Card */}
      <View
        style={{
          backgroundColor: colors.card,
          padding: 14,
          borderRadius: 14,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.sub,
            marginBottom: 8,
          }}
        >
          Recipe
        </Text>

        <Text style={{ color: colors.text, lineHeight: 22 }}>
          {recipe.recipe}
        </Text>
      </View>

      {/* Optional Video Link */}
      {recipe.vidlink ? (
        <View
          style={{
            backgroundColor: colors.card,
            padding: 14,
            borderRadius: 14,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.sub,
              marginBottom: 8,
            }}
          >
            Video Link
          </Text>

          <Text style={{ color: colors.accent }}>
            {recipe.vidlink}
          </Text>
        </View>
      ) : null}

      {/* Actions */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => router.replace("/")}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 12,
            backgroundColor: colors.border,
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.text, fontWeight: "600" }}>
            Back
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push(`/recipe/${recipe.id}`)}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 12,
            backgroundColor: colors.accent,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Edit
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}