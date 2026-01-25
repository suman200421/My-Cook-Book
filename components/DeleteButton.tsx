import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Alert, Pressable, Text } from "react-native";
//import { colors } from "@/lib/colors";

type DeleteButtonProps = {
  onConfirm: () => void;
};

const DeleteButton = ({ onConfirm}: DeleteButtonProps) => {
  return (
    <Pressable
      onPress={() =>
        Alert.alert(
          "Delete Recipe",
          "Are you sure you want to delete this recipe?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: 'delete',
              style: "destructive",
              onPress: onConfirm,
            },
          ]
        )
      }
    >
      <Text
        style={{
            padding:3,
            borderRadius:20,
            fontSize: 18,
            color: "red",
            fontWeight: "600",
            //justifyContent:"center"
        }}
      >
        <MaterialCommunityIcons name="delete-outline" size={24} color="black" />
      </Text>
    </Pressable>
  );
};

export default DeleteButton;