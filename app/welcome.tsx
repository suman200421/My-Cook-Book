import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const INGREDIENTS = [
  { emoji: "🍅", x: -60 },
  { emoji: "🧄", x: 60 },
  { emoji: "🧅", x: -100 },
  { emoji: "🌿", x: 100 },
  { emoji: "🥕", x: 0 },
];

function AnimatedIngredient({
  emoji,
  x,
  progress,
}: {
  emoji: string;
  x: number;
  progress: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(-progress.value * 220) },
        { translateX: withSpring(x * progress.value) },
        { rotate: `${progress.value * 360}deg` },
      ],
      opacity: progress.value,
    };
  });

  return (
    <Animated.Text style={[styles.ingredient, animatedStyle]}>
      {emoji}
    </Animated.Text>
  );
}


export default function Welcome() {
  const router = useRouter();

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1200 });

    // Navigate after animation
    setTimeout(() => {
      router.replace("/");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Ingredients */}
      {INGREDIENTS.map((item, index) => (
        <AnimatedIngredient
            key={index}
            emoji={item.emoji}
            x={item.x}
            progress={progress}
        />
    ))}


      {/* Dish */}
      <Text style={styles.dish}>🍲</Text>

      {/* App Name */}
      <Text style={styles.title}>My Recipe Book</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6ED",
    justifyContent: "center",
    alignItems: "center",
  },
  dish: {
    fontSize: 80,
    marginTop: 40,
  },
  ingredient: {
    position: "absolute",
    fontSize: 40,
    bottom: "50%",
  },
  title: {
    marginTop: 24,
    fontSize: 26,
    fontWeight: "700",
    color: "#D9480F",
  },
});