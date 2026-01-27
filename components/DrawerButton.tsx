import { useDrawer } from "@/components/DrawerContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable } from "react-native";

export default function DrawerButton() {
  const { openDrawer } = useDrawer();

  return (
    <Pressable
      onPress={openDrawer}
      style={{ paddingHorizontal: 12 }}
    >
    <AntDesign name="menu" size={24} color="black" />
    </Pressable>
  );
}
