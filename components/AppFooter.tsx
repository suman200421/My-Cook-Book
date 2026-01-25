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
{/*import { colors } from "@/lib/colors";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
        { paddingBottom: insets.bottom + 6 },
      ]}
    >

    
      <Pressable style={styles.iconButton}>
        <Text style={styles.icon}>🏠</Text>
      </Pressable>



      <Pressable style={styles.iconButton}>
        <Text style={styles.icon}>📖</Text>
      </Pressable>



      <Pressable style={styles.addButton}>
        <Text style={styles.addIcon}>＋</Text>
      </Pressable>



      <Pressable style={styles.iconButton}>
        <Text style={styles.icon}>🗓️</Text>
      </Pressable>



      <Pressable style={styles.iconButton}>
        <Text style={styles.icon}>🛒</Text>
      </Pressable>
    </View>
  );
};

export default AppFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },

  iconButton: {
    padding: 8,
  },

  icon: {
    fontSize: 22,
    color: "#000000", // black icons
  },

  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20, // 👈 lifts the button (Instagram feel)
  },

  addIcon: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: "700",
    lineHeight: 30,
  },
});
*/}