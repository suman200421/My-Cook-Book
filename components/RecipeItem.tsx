import { colors } from '@/lib/colors';
import { Recipe } from '@/types';
import { router } from 'expo-router';
import { useState } from "react";
import { Pressable, Text, View } from 'react-native';
import DeleteButton from './DeleteButton';
import FavoriteButton from './FavoriteButton';



export const RecipeItem = ({
   item,
   onRemove,
  }: {
    item: Recipe,
    onRemove: (id: string) => void;
  }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Pressable 
    onPress={()=> router.push(`/recipe/view/${item.id}`)}
    style ={
      ({pressed})=>({
      //flex:1,
      backgroundColor: colors.card,
      padding:10,
      height:200,
      width:185,
      borderRadius:16,
      borderWidth:1,
      borderColor: colors.border,
      gap:6,
      alignSelf: "stretch",
      //paddingBottom:-34,
      opacity:pressed?0.7:1
      })
    }>

    <Pressable
      onPress={() => setMenuOpen((v) => !v)}
      hitSlop={10}
      style={{
        position: "absolute",
        top: 6,
        right: 6,
        width:30,
        height:30,
        zIndex: 10,
        borderRadius:30,
        alignItems: "center",
        backgroundColor:colors.border,
      }}
    >
      <Text style={{ fontSize: 20,fontWeight:900, color: colors.sub }}>⋮</Text>
    </Pressable>


    <View style={{
      flexDirection:'column',
      justifyContent:'space-between',
      alignItems:'center'
      }}
    >
      <View style={{alignItems: "center",marginTop:20}}>
        <Text 
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{ color: colors.text, fontSize: 14, fontWeight: "700", flexShrink:1, 
          //maxWidth:"80%"
          }}>
          {item.title}
        </Text>

     {/*<View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 8,
          backgroundColor: colors.border,
          flexShrink:0,
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
      </View>*/}

      </View>

      {(item.prepTime || item.cookTime) && (
        <View
          style={{
            position: "absolute",
            bottom: -130,
            left: 10,
            right: 10,
            flexDirection: "row",
            //gap:5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {item.prepTime != null && (
            <Text
              style={{
                fontSize: 12.5,
                color: colors.sub,
                fontWeight: "600",
              }}
            >
              ⏱ {item.prepTime} min
            </Text>
          )}

          {item.cookTime != null && (
            <Text
              style={{
                fontSize: 12.5,
                color: colors.sub,
                fontWeight: "600",
              }}
            >
              🔥 {item.cookTime} min
            </Text>
          )}
        </View>
      )}

      {menuOpen && (
        <View
          style={{
            position: "absolute",
            top: 34,
            right: 6,
            backgroundColor: colors.card,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
            paddingVertical: 4,
            zIndex: 20,
            elevation: 5,
          }}
        >
          {/* Favorite */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
              paddingVertical: 8,
              gap: 8,
            }}
          >
            <FavoriteButton
              recipeId={item.id}
              isFavorite={item.isFavorite}
            />
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: colors.border }} />

          {/* Remove */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
              paddingVertical: 8,
              gap: 8,
            }}
          >
          <DeleteButton onConfirm={() => onRemove(item.id)} />
          </View>
        </View>
      )}  
    </View>
    </Pressable>
    //</Link>
  );
}