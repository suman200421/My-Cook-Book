import { Alert, Pressable, Text } from "react-native";
//import { colors } from "@/lib/colors";

type DeleteButtonProps = {
  onConfirm: () => void;
  label?: string;
};

const DeleteButton = ({ onConfirm, label = "🗑️" }: DeleteButtonProps) => {
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
            padding:6,
            borderRadius:20,
            fontSize: 18,
            color: "red",
            fontWeight: "600",
            //justifyContent:"center"
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default DeleteButton;