import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Picker } from "@react-native-picker/picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from "react-native";


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

    


    const [ title, setTitle ] =useState(existingRecipe?.title ?? "");
    const [ ingredients, setIngredients ] =useState(existingRecipe?.ingredients ?? '');
    const [ recipe, setRecipe ] = useState(existingRecipe?.recipe ?? '');
    const [ vidlink, setVidlink ] = useState(existingRecipe?.vidlink ?? '');
    /*const [ isPinned, setIsPinned ] = useState(0);
    const [ createdAt, setCreatedAt ] = useState(Date.now());
    const [ updatedAt, setUpdatedAt ] = useState(Date.now());*/

    const isDisabled = title.length <=0 || ingredients.length <=0 || recipe.length <=0;


    const save =async()=>{
        try {
           if(isNew){
                await addRecipe(
                    title,
                    ingredients,
                    recipe,
                    vidlink,
                    category
            );
            router.replace('/');
            }else if(typeof id ==='string'){
                await updatedRecipe(
                    id,
                    title,
                    ingredients,
                    recipe,
                    vidlink,
                    category
                );
           }
           Alert.alert('Success', isNew ? 'Recipe created successfully' : 'Recipe updated successfully',
            [{
                text:'OK',
                onPress:()=>{
                    router.replace('/');
                }
            }]
           );
        } catch (error) {
            Alert.alert('Error', 'An error occurred while saving the recipe.');
            console.error('Error saving recipe:', error);
        }

        router.back();
    };


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

            <View
                style={{
                    backgroundColor: colors.card,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.border,
                    //overflow: 'hidden',
                }}
            >
                <Picker
                    selectedValue={category}
                    onValueChange={(value) => setCategory(value)}
                >
                    <Picker.Item label="Main course" value="Main course" />
                    <Picker.Item label="Dessert" value="Dessert" />
                    <Picker.Item label="Appetizer" value="Appetizer" />
                    <Picker.Item label="Beverage" value="Beverage" />
                    <Picker.Item label="Salad" value="Salad" />
                    <Picker.Item label="Soup" value="Soup" />
                    <Picker.Item label="Snack" value="Snack" />
                    <Picker.Item label="Bread" value="Bread" />
                    <Picker.Item label="Sauce" value="Sauce" />
                    <Picker.Item label="Side dish" value="Side dish" />
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>
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

        </View>
    </View>;
};


export default RecipeEditorScreen;