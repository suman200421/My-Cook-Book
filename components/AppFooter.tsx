import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppFooterProps = {
  children: ReactNode;
};

const AppFooter = ({ children }: AppFooterProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 12, // 👈 SAFE AREA FIX
        },
      ]}
    >
      {children}
    </View>
  );
};

export default AppFooter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "#FFF7ED", // match your app background
    borderTopWidth: 1,
    borderTopColor: "#E7D3BE",
  },
});
