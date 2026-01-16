import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Pressable, Text } from "react-native";

type Props = {
  recipeId: string;
  isFavorite?: boolean;
  size?: number;
};

const FavoriteButton = ({
  recipeId,
  isFavorite = false,
  size = 18,
}: Props) => {
  const { toggleFavorite } = useRecipes();

  return (
    <Pressable
      onPress={() => toggleFavorite(recipeId)}
      hitSlop={10}
      style={{
        padding: 6,
        borderRadius: 20,
        backgroundColor: isFavorite
          ? colors.accent + "22"
          : "transparent",
      }}
    >
      <Text
        style={{
          fontSize: size,
          color: isFavorite ? colors.accent : colors.sub,
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </Text>
    </Pressable>
  );
};

export default FavoriteButton;
