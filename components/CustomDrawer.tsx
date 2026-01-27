import { colors } from "@/lib/colors";
import { Pressable, Text, View } from "react-native";
import { useDrawer } from "./DrawerContext";

export default function CustomDrawer() {
  const { open, closeDrawer } = useDrawer();

  if (!open) return null;

  return (
    <Pressable
      onPress={closeDrawer}
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 100,
      }}
    >
      <View
        style={{
          width: 260,
          height: "100%",
          backgroundColor: colors.card,
          paddingTop: 60,
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 16 }}>
          Menu
        </Text>

        {["Profile", "Planner", "Shopping List", "Settings"].map((item) => (
          <Pressable
            key={item}
            style={{ paddingVertical: 14 }}
            onPress={closeDrawer}
          >
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </Pressable>
  );
}
