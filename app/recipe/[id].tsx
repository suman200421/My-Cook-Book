import AppFooter from "@/components/AppFooter";
import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { INGREDIENTS } from '@/lib/ingredients';
import Entypo from '@expo/vector-icons/Entypo';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";

const RecipeEditorScreen = () => {
    const { id } = useLocalSearchParams();

    const router = useRouter();

    const isNew = id === 'new';

    const { recipes, addRecipe, updatedRecipe } = useRecipes();

    const existingRecipe = !isNew
        ? recipes.find((r) => r.id === id)
        : null;

    const [category, setCategory] = useState<
        "Main course" | "Dessert" | "Appetizer" | "Beverage" | "Salad" | "Soup" | "Snack" | "Bread" | "Sauce" | "Side dish" | "Breakfast" | "Other"
    >(existingRecipe?.category ?? "Main course");
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);



    const [title, setTitle] = useState(existingRecipe?.title ?? "");



    type IngredientInput = {
        name: string;
        quantity: string;
        unit: string
    }

    const [ingredients, setIngredients] = useState<IngredientInput[]>(
        existingRecipe
            ? existingRecipe.ingredients
                .split(",")
                .map((i) => {
                    const parts = i.trim().split(" ");
                    return {
                        quantity: parts[0]?.match(/^\d/) ? parts[0] : "",
                        unit: parts[1]?.match(/^[a-zA-Z]+$/) ? parts[1] : "",
                        name: parts.slice(2).join(" ") || i.trim(),
                    };
                })
            : []
    );

    const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);
    const [servings, setServings] = useState<string>(
        existingRecipe?.servings?.toString() ?? ""
    );

    const [recipe, setRecipe] = useState(existingRecipe?.recipe ?? '');
    const [vidlink, setVidlink] = useState(existingRecipe?.vidlink ?? '');
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");

    const [recipeNotes, setRecipeNotes] = useState(existingRecipe?.recipeNotes ?? '');

    const [difficulty, setDifficulty] = useState<
    |"Beginner"| "Easy"| "Intermediate"| "Advanced"| "Chef Mode"
    >(existingRecipe?.difficulty ?? "Easy");

    const [difficultyModalVisible, setDifficultyModalVisible] = useState(false);


    const isDisabled = title.length <= 0 || ingredients.length <= 0 || recipe.length <= 0;


    const save = async () => {
        const parsedPrepTime =
            prepTime.trim() === "" ? 0 : Number(prepTime);
        const parsedCookTime =
            cookTime.trim() === "" ? 0 : Number(cookTime);

        try {
            const ingredientsString = ingredients
                .filter((i) => i.name)
                .map(
                    (i) =>
                        `${i.quantity ? i.quantity + " " : ""}${i.unit ? i.unit + " " : ""}${i.name}`
                )
                .join(", ");
            const servingsNumber =
                servings.trim() === "" ? 0 : Number(servings);


            if (isNew) {
                await addRecipe(
                    title,
                    ingredientsString,//changed
                    recipe,
                    vidlink,
                    category,
                    servingsNumber,
                    parsedPrepTime,
                    parsedCookTime,
                    difficulty,
                    recipeNotes
                );
                // ✅ After CREATE → go to Recipes list
                Alert.alert("Success", "Recipe created successfully", [
                    {
                        text: "OK",
                        onPress: () => { router.back() },
                    },
                ]);
            }
            else if (typeof id === "string") {
                await updatedRecipe(
                    id,
                    title,
                    ingredientsString,//changed
                    recipe,
                    vidlink,
                    category,
                    servingsNumber,
                    parsedPrepTime,
                    parsedCookTime,
                    difficulty,
                    recipeNotes
                );

                // ✅ After EDIT → stay on VIEW page
                Alert.alert("Success", "Recipe updated successfully", [
                    {
                        text: "OK",
                        onPress: () =>
                            //router.replace(`/recipe/view/${id}`),
                            router.back(),
                    },
                ]);
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred while saving the recipe.");
            console.error(error);
        }
    };


    const CATEGORIES = [
        "Main course",
        "Dessert",
        "Appetizer",
        "Beverage",
        "Salad",
        "Soup",
        "Snack",
        "Bread",
        "Side dish",
        "Breakfast",
        "Other"
    ] as const;



    return <View style={{ flex: 1 }} >
        <Stack.Screen options={{
            title: isNew ? "Create Recipe" : "Edit Recipe",
            headerBackVisible: false,
        }} />
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
                padding: 16,
                paddingBottom: 120, // ✅ space for footer
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View style={{ marginBottom: 10 }}>
                <TextInput
                    placeholder="Recipe Name"
                    placeholderTextColor={colors.sub}
                    value={title}
                    onChangeText={setTitle}
                    style={{
                        backgroundColor: colors.card,
                        color: colors.text,
                        paddingHorizontal: 14,
                        paddingVertical: 12,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.border,
                        fontWeight: '700'
                    }}
                />
            </View>

            <View style={{ gap: 12, padding: 16, marginBottom: 5 }}>

                {/* Category Input (Pressable) */}
                <Pressable
                    onPress={() => setCategoryModalVisible(true)}
                    style={{
                        backgroundColor: colors.card,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.border,
                        paddingHorizontal: 14,
                        paddingVertical: 14,
                        marginHorizontal: -15,
                        marginVertical: -15
                    }}
                >
                    <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>
                        {category}
                    </Text>
                </Pressable>


                {/* other inputs here (ingredients, recipe, etc.) */}

                {/* Category Modal (SEPARATE, not nested) */}
                <Modal
                    visible={categoryModalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setCategoryModalVisible(false)}
                >
                    <Pressable
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.4)",
                            justifyContent: "flex-end",
                        }}
                        onPress={() => setCategoryModalVisible(false)}
                    >
                        <View
                            style={{
                                backgroundColor: colors.bg,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                padding: 16,
                                maxHeight: "60%",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "700",
                                    marginBottom: 12,
                                    color: colors.text,
                                }}
                            >
                                Select Category
                            </Text>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {CATEGORIES.map((item) => (
                                    <Pressable
                                        key={item}
                                        onPress={() => {
                                            setCategory(item);
                                            setCategoryModalVisible(false);
                                        }}
                                        style={{
                                            paddingVertical: 14,
                                            borderBottomWidth: 1,
                                            borderBottomColor: colors.border,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color:
                                                    item === category ? colors.accent : colors.text,
                                                fontWeight:
                                                    item === category ? "700" : "500",
                                            }}
                                        >
                                            {item}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    </Pressable>
                </Modal>

            </View>

            <View style={{ marginBottom: 16 }}>
                <TextInput
                    value={servings}
                    onChangeText={setServings}
                    placeholder="Servings (e.g. 2)"
                    placeholderTextColor={colors.sub}
                    keyboardType="numeric"
                    style={{
                        backgroundColor: colors.card,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.border,
                        paddingHorizontal: 14,
                        paddingVertical: 12,
                        color: colors.text,
                        fontWeight: "600",
                    }}
                />
            </View>

            <View style={{ marginBottom: 16 }}>
  <Pressable
    onPress={() => setDifficultyModalVisible(true)}
    style={{
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      paddingVertical: 14,
    }}
  >
    <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>
      Difficulty: {difficulty}
    </Text>
  </Pressable>

  <Modal
    visible={difficultyModalVisible}
    transparent
    animationType="slide"
    onRequestClose={() => setDifficultyModalVisible(false)}
  >
    <Pressable
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
      }}
      onPress={() => setDifficultyModalVisible(false)}
    >
      <View
        style={{
          backgroundColor: colors.bg,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 16,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 12,
            color: colors.text,
          }}
        >
          Select Difficulty
        </Text>

        {["Beginner", "Easy", "Intermediate", "Advanced", "Chef Mode"].map((level) => (
          <Pressable
            key={level}
            onPress={() => {
              setDifficulty(level as any);
              setDifficultyModalVisible(false);
            }}
            style={{
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color:
                  level === difficulty ? colors.accent : colors.text,
                fontWeight:
                  level === difficulty ? "700" : "500",
              }}
            >
              {level}
            </Text>
          </Pressable>
        ))}
      </View>
    </Pressable>
  </Modal>
</View>



            {/* INGREDIENTS SECTION */}

            <Pressable
                onPress={() => setIngredients((prev) => [...prev, { name: "", quantity: "", unit: "" }])}
                style={{
                    marginBottom: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 10,
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.border,
                    marginTop: 8,
                }}
            >
                <Text style={{ color: colors.text, fontWeight: "600" }}>
                    + Add Ingredient
                </Text>
            </Pressable>

            {/* INGREDIENT INPUT ROWS */}
            <View style={{ marginBottom: 8 }}>
                {ingredients.map((ingredient, index) => {
                    const query = ingredient.name.trim().toLowerCase();
                    const suggestions = INGREDIENTS.filter((item) =>
                        item.toLowerCase().includes(query)
                    ).slice(0, 5);

                    return (
                        <View key={index} style={{ marginTop: 8 }}>
                            {/* INPUT ROW */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <View style={{ flex: 2 }}>
                                    <TextInput
                                        value={ingredient.name}
                                        placeholder={`Ingredient ${index + 1}`}
                                        placeholderTextColor={colors.sub}

                                        onFocus={() => setActiveIngredientIndex(index)}
                                        onBlur={() => setActiveIngredientIndex(null)}

                                        onChangeText={(text) => {
                                            const updated = [...ingredients];
                                            updated[index].name = text;
                                            setIngredients(updated);
                                        }}
                                        style={{
                                            flex: 1,
                                            backgroundColor: colors.card,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: colors.border,
                                            paddingHorizontal: 12,
                                            paddingVertical: 10,
                                            color: colors.text,
                                        }}
                                    />
                                </View>

                                {/* REMOVE */}
                                <Pressable
                                    onPress={() =>
                                        setIngredients((prev) => prev.filter((_, i) => i !== index))
                                    }
                                >
                                    <View
                                        style={{
                                            padding: 6,
                                            borderRadius: 6,
                                        }}
                                    >
                                        <Entypo name="cross" size={24} color={colors.accent} />
                                    </View>
                                </Pressable>
                            </View>

                            {/* SUGGESTIONS DROPDOWN */}
                            {activeIngredientIndex === index &&
                                ingredient.name.length > 0 &&
                                suggestions.length > 0 &&
                                !suggestions.includes(ingredient.name) && (

                                    <View
                                        style={{
                                            backgroundColor: colors.card,
                                            borderRadius: 8,
                                            borderWidth: 1,
                                            borderColor: colors.border,
                                            marginTop: 4,
                                            maxHeight: 150,
                                        }}
                                    >
                                        {suggestions.map((item) => (
                                            <Pressable
                                                key={item}
                                                onPress={() => {
                                                    const updated = [...ingredients];
                                                    updated[index].name = item;
                                                    setIngredients(updated);
                                                    setActiveIngredientIndex(null);
                                                }}
                                                style={{
                                                    paddingVertical: 8,
                                                    paddingHorizontal: 12,
                                                }}
                                            >
                                                <Text style={{ color: colors.text }}>{item}</Text>
                                            </Pressable>
                                        ))}
                                    </View>

                                )}
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 8,
                                    marginTop: 6,
                                }}
                            >
                                <View style={{ flex: .8 }}>
                                    <TextInput
                                        value={ingredient.quantity}
                                        placeholder="Qty"
                                        keyboardType="numeric"
                                        onChangeText={(text) => {
                                            const updated = [...ingredients];
                                            updated[index].quantity = text;
                                            setIngredients(updated);
                                        }}
                                        style={{
                                            backgroundColor: colors.card,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: colors.border,
                                            paddingHorizontal: 12,
                                            paddingVertical: 10,
                                            color: colors.text,
                                        }}
                                    />
                                </View>
                                <View style={{ flex: .8 }}>
                                    <TextInput
                                        value={ingredient.unit}
                                        placeholder="Unit"
                                        onChangeText={(text) => {
                                            const updated = [...ingredients];
                                            updated[index].unit = text;
                                            setIngredients(updated);
                                        }}
                                        style={{
                                            backgroundColor: colors.card,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: colors.border,
                                            paddingHorizontal: 12,
                                            paddingVertical: 10,
                                            color: colors.text,
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>

            <View style={{ marginBottom: 16 }}>
                <TextInput
                    placeholder="Write the step by step process"
                    placeholderTextColor={colors.sub}
                    value={recipe}
                    onChangeText={setRecipe}
                    multiline
                    style={{
                        height: 350,
                        flex: 1,
                        //minHeight:180,
                        backgroundColor: colors.card,
                        color: colors.text,
                        paddingHorizontal: 14,
                        paddingVertical: 12,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.border,
                        fontWeight: '700',
                        textAlignVertical: 'top'
                    }}
                />
            </View>

            <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
                <TextInput
                    placeholder="Prep Time (min)"
                    value={prepTime}
                    onChangeText={setPrepTime}
                    keyboardType="numeric"
                    style={{
                        flex: 1,
                        backgroundColor: colors.card,
                        padding: 12,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.border,
                        color: colors.text,
                        fontWeight: "700",
                    }}
                />

                <TextInput
                    placeholder="Cook Time (min)"
                    value={cookTime}
                    onChangeText={setCookTime}
                    keyboardType="numeric"
                    style={{
                        flex: 1,
                        backgroundColor: colors.card,
                        padding: 12,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.border,
                        color: colors.text,
                        fontWeight: "700",
                    }}
                />
            </View>

            <View style={{ marginBottom: 16}}>
                <TextInput
                    value={recipeNotes}
                    onChangeText={setRecipeNotes}
                    placeholder="Recipe Notes"
                    placeholderTextColor={colors.sub}
                    style={{
                        backgroundColor: colors.card,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.border,
                        paddingHorizontal: 14,
                        paddingVertical: 12,
                        color: colors.text,
                        fontWeight: "600",
                        height: 100,
                        textAlignVertical: "top",
                    }}
                />
            </View>

            <TextInput
                placeholder="Optional video link for recipe"
                placeholderTextColor={colors.sub}
                value={vidlink}
                onChangeText={setVidlink}
                style={{
                    backgroundColor: colors.card,
                    color: colors.text,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.border,
                    fontWeight: '700'
                }}
            />
        </ScrollView>
        <AppFooter>
            <Pressable style={{
                marginBottom: 12
            }}
                disabled={isDisabled}
                onPress={save}
            >
                <Text style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 12,
                    backgroundColor: colors.accent,
                    color: '#fff',
                    fontWeight: '600',
                    overflow: "hidden",
                    marginRight: 10,
                    marginTop: 5,
                    marginBottom: -25,
                    opacity: isDisabled ? 0.5 : 1
                }}>
                    Save
                </Text>
            </Pressable>
        </AppFooter>
    </View>
        ;
};


export default RecipeEditorScreen;