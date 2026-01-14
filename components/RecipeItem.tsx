import { colors } from '@/lib/colors';
import { Recipe } from '@/types';
import { router } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';

export const RecipeItem = ({
   item,
   onRemove
  }: {
    item: Recipe,
    onRemove: (id: string) => void;
  }) => {

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const isUpdated = item.updatedAt !== item.createdAt;

  const timeLabel = isUpdated
    ? `Updated: ${formatDate(item.updatedAt)}`
    : `Created: ${formatDate(item.createdAt)}`;


  return (
    <Pressable 
    onPress={()=> router.push(`/recipe/view/${item.id}`)}
    style ={
      ({pressed})=>({
      backgroundColor: colors.card,
      padding:14,
      borderRadius:16,
      borderWidth:1,
      borderColor: colors.border,
      gap:6,
      opacity:pressed?0.7:1
      })
    }>
    <View style={{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}>
          {item.title}
        </Text>

      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 8,
          backgroundColor: colors.border,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: colors.sub,
            fontWeight: "600",
          }}
        >
          {item.category}
        </Text>
      </View>
    </View>


      <View style={{
        flexDirection:'row',
        gap:8
      }}>
        <Pressable
          onPress={() =>
            Alert.alert(
              "Delete Recipe",
              "Are you sure you want to delete this recipe?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => onRemove(item.id),
                },
              ]
            )
          }
        >

          <Text style={{color: colors.sub,}}>
            Remove
          </Text>
        </Pressable>
      </View>
    </View>
    <Text numberOfLines={1} style= {{color: colors.sub, fontSize:14}}>
      {item.ingredients}
    </Text>
    <Text style= {{color: colors.sub, fontSize:12}}>
      {timeLabel}
    </Text>
    </Pressable>
    //</Link>
  );
}