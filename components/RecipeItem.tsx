import { colors, difficultyColors } from '@/lib/colors';
import { Recipe } from '@/types';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from "react";
import { Image, Pressable, Text, View } from 'react-native';
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
      onPress={() => router.push(`/recipe/view/${item.id}`)}
      style={
        ({ pressed }) => ({
          //flex:1,
          backgroundColor: colors.card,
          padding: 10,
          height: 190,
          width: 185,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: colors.border,
          gap: 6,
          alignSelf: "stretch",
          //paddingBottom:-34,
          opacity: pressed ? 0.7 : 1
        })
      }>

      <Pressable
        onPress={() => setMenuOpen((v) => !v)}
        hitSlop={10}
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          width: 25,
          height: 25,
          zIndex: 10,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.accent,
        }}
      >
        <Entypo name="dots-three-vertical" size={12} color="white" />
      </Pressable>


      <View style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      >
        <Image
          source={require("@/assets/images/default_recipe_picture.png")}
          resizeMode="cover"
          style={{
            width: 174,
            height: 120,
            borderRadius: 12,
            marginBottom: 0,
            marginTop: -5
          }}
        />
        <View style={{ marginTop: "auto", alignItems: "flex-start" }}>
          <Text
            numberOfLines={1}
            //ellipsizeMode='tail'
            style={{
              color: colors.text,
              fontSize: 14,
              fontWeight: "700",
              flexShrink: 1,
              textAlign: 'left',
            }}>
            {item.title}
          </Text>
        </View>

        {item.difficulty && difficultyColors[item.difficulty] && (
          <View
            style={{
              position: "absolute",
              top: -4,
              left: -4,
              backgroundColor: difficultyColors[item.difficulty],
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {item.difficulty}
            </Text>
          </View>
        )}


        {(item.prepTime !== null || item.cookTime !== null || item.servings !== null) && (
          <View
            style={{
              position: "absolute",
              bottom: -35,
              left: 10,
              right: 10,
              flexDirection: "row",
              gap: 5,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {item.servings != null && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Ionicons
                  name="person-outline"
                  size={15}
                  color={colors.sub}
                />
                <Text style={{ fontSize: 11, color: colors.sub }}>
                  {item.servings}
                </Text>
              </View>
            )}
            {item.prepTime != null && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Ionicons
                  name="time-outline"
                  size={15}
                  color={colors.sub}
                />
                <Text style={{ fontSize: 11, color: colors.sub }}>
                  {item.prepTime} min
                </Text>
              </View>
            )}

            {item.cookTime != null && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Ionicons
                  name="flame-outline"
                  size={15}
                  color={colors.sub}
                />
                <Text style={{ fontSize: 11, color: colors.sub }}>
                  {item.cookTime} min
                </Text>
              </View>
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