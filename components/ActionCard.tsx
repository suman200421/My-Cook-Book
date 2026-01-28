import { colors } from "@/lib/colors";
import { Pressable, Text, View } from "react-native";

type ActionCardProps = {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
};

export default function ActionCard({
  icon,
  title,
  onPress = () => {},
}: ActionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 80,
        height: 80,
        margin: 8,
        backgroundColor: colors.card,
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <View>{icon}</View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "900",
            color: colors.sub,
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
