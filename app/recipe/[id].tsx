import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from "react-native";


const RecipeEditorScreen=()=>{
    const { id } =useLocalSearchParams();
    
    const navigation = useNavigation();

    const isNew = id ==='new'

    const [ title, setTitle ] =useState('');
    const [ ingredients, setIngredients ] =useState('');
    const [ recipe, setRecipe ] = useState('');
    const [ vidlink, setVidlink ] = useState('');
    const isDisabled = title.length <=0 || ingredients.length <=0 || recipe.length <=0;

    const { addRecipe } = useRecipes();

    const save =()=>{
        if(isNew){
            addRecipe(title, ingredients, recipe, vidlink);
        }
        navigation.goBack();
    };

    return<View style={{flex:1}} >
        <Stack.Screen options={{
            title: isNew? "Create Recipe" : "Edit Recipe"
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
            <Pressable style={{marginBottom:12}} disabled={isDisabled} onPress={save}>
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
