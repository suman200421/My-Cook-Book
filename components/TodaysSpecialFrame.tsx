import { Image, StyleSheet, View } from "react-native";

export function TodaysSpecialFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      {/* Corners */}
      <Image source={require("@/assets/frames/left-upper.png")} style={[styles.corner, styles.tl]} />
      <Image source={require("@/assets/frames/right-upper.png")} style={[styles.corner, styles.tr]} />
      <Image source={require("@/assets/frames/left-lower.png")} style={[styles.corner, styles.bl]} />
      <Image source={require("@/assets/frames/right-lower.png")} style={[styles.corner, styles.br]} />

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const CORNER_SIZE = 100;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 24,
    position: "relative",
  },

  content: {
    padding: 12,
  },

  corner: {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    // resizeMode: "contain",
  },

  tl: { top: 0, left: -4 },
  tr: { top: -4, right: 0 },
  bl: { bottom: -4, left: 0 },
  br: { bottom: 0, right: -4 },
});
