import { colors } from "@/lib/colors";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
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
    </View>
  );
}
