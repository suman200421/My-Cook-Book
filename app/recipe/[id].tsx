import { colors } from "@/lib/colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from 'react';
import { Text, TextInput, View } from "react-native";

const RecipeEditorScreen=()=>{
    const { id } =useLocalSearchParams();
    const isNew = id ==='new'

    const [ title, setTitle ] =useState('');
    const [ ingredients, setIngredients ] =useState('');
    const [ recipe, setRecipe ] = useState('')

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
                    minHeight:180,
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
                    marginTop:12
                  }}>
                    Save
            </Text>
        </View>
    </View>;
};

export default RecipeEditorScreen;