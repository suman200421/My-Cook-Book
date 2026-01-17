import AppFooter from "@/components/AppFooter";
import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";


const RecipeEditorScreen=()=>{
    const { id } =useLocalSearchParams();
    
    const router = useRouter();

    const isNew = id ==='new';

    const { recipes, addRecipe, updatedRecipe } = useRecipes();

    const existingRecipe = !isNew
        ? recipes.find((r) => r.id === id)
        : null;

    const [category, setCategory] = useState<
        "Main course" | "Dessert" | "Appetizer" | "Beverage" | "Salad" | "Soup" | "Snack" | "Bread" | "Sauce" | "Side dish" | "Breakfast" | "Other"
    >(existingRecipe?.category ?? "Main course");
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    


    const [ title, setTitle ] =useState(existingRecipe?.title ?? "");
    const [ ingredients, setIngredients ] =useState(existingRecipe?.ingredients ?? '');
    const [ recipe, setRecipe ] = useState(existingRecipe?.recipe ?? '');
    const [ vidlink, setVidlink ] = useState(existingRecipe?.vidlink ?? '');
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");

    const isDisabled = title.length <=0 || ingredients.length <=0 || recipe.length <=0;


    const save = async () => {
        const parsedPrepTime =
            prepTime.trim() === "" ? 0 : Number(prepTime);
        const parsedCookTime =
            cookTime.trim() === "" ? 0 : Number(cookTime);
        try {
            if (isNew) {
                await addRecipe(
                    title,
                    ingredients,
                    recipe,
                    vidlink,
                    category,
                    parsedPrepTime,
                    parsedCookTime,
                );  
                // ✅ After CREATE → go to Recipes list
                Alert.alert("Success", "Recipe created successfully", [
                {
                    text: "OK",
                    onPress: () => {router.back()},
                },
                ]);
            } 
            else if (typeof id === "string") {
                await updatedRecipe(
                id,
                title,
                ingredients,
                recipe,
                vidlink,
                category,
                parsedPrepTime,
                parsedCookTime,
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



    return<View style={{flex:1}} >
        <Stack.Screen options={{
            title: isNew? "Create Recipe" : "Edit Recipe",
            headerBackVisible: false,
        }}/>
        <View style={{padding: 16, gap: 12, flex: 1}}>
            <TextInput
                placeholder="Recipe Name"
                placeholderTextColor={colors.sub}
                value={title}
                onChangeText={setTitle}
                style={{
                    backgroundColor:colors.card,
                    color:colors.text,
                    paddingHorizontal:14,
                    paddingVertical:12,
                    borderRadius:12,
                    borderWidth:1,
                    borderColor:colors.border,
                    fontWeight:'700'
                }}
            />

            <View style={{gap: 12, padding: 16 }}>

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
                        marginHorizontal:-15,
                        marginVertical:-15
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

            <TextInput
                placeholder="Recipe Ingredients(Separated Using comma)"
                placeholderTextColor={colors.sub}
                value={ingredients}
                onChangeText={setIngredients}
                style={{
                    backgroundColor:colors.card,
                    color:colors.text,
                    paddingHorizontal:14,
                    paddingVertical:12,
                    borderRadius:12,
                    borderWidth:1,
                    borderColor:colors.border,
                    fontWeight:'700'
                }}
            />
            <TextInput
                placeholder="Write the step by step process"
                placeholderTextColor={colors.sub}
                value={recipe}
                onChangeText={setRecipe}
                multiline
                style={{
                    flex:1,
                    //minHeight:180,
                    backgroundColor:colors.card,
                    color:colors.text,
                    paddingHorizontal:14,
                    paddingVertical:12,
                    borderRadius:12,
                    borderWidth:1,
                    borderColor:colors.border,
                    fontWeight:'700',
                    textAlignVertical:'top'
                }}
            />

            <View style={{ flexDirection: "row", gap: 12 }}>
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

            <TextInput
                placeholder="Optional video link for recipe"
                placeholderTextColor={colors.sub}
                value={vidlink}
                onChangeText={setVidlink}
                style={{
                    backgroundColor:colors.card,
                    color:colors.text,
                    paddingHorizontal:14,
                    paddingVertical:12,
                    borderRadius:12,
                    borderWidth:1,
                    borderColor:colors.border,
                    fontWeight:'700'
                }}
            />
            <AppFooter>
                <Pressable style={{
                    marginBottom:12}}
                    disabled={isDisabled}
                    onPress={save}
                >
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
                            marginTop:12,
                            opacity: isDisabled ? 0.5 : 1
                        }}>
                            Save
                    </Text>
                </Pressable>
            </AppFooter>
        </View>
    </View>;
};


export default RecipeEditorScreen;