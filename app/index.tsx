import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { recipes } = useRecipes();
  return (
    <View
      style={{
        flex: 1
      }}
    >
    <Stack.Screen
        options={{
          title: 'Recipes'}}
    />
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
        marginTop:12
      }}>
        Add Recipes
      </Text>
    </Link>
    <View>
      {recipes.map((recip) => 
        <Text style= {{color:colors.text}}key={recip.id}>
          {recip.title}
        </Text>)}
    </View>
    </View>
  );
}
