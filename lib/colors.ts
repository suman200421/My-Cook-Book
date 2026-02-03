export const colors = {
  bg: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1C1410',
  sub: '#8A6A5A',
  input: '#FFF1E8',
  border: '#F2C6B4',
  accent: '#B71C1C',
  veg: '#2E7D32',    // For "Vegetarian" labels
  nonVeg: '#C62828', // For "Meat" labels
  star: '#FBC02D',   // For rating stars
};

export const difficultyColors: Record<
  "Beginner" | "Easy" | "Intermediate" | "Advanced" | "Chef Mode",
  string
> = {
  Beginner: "#4CAF50",      // light green – very approachable
  Easy: "#2E7D32",          // green – comfortable
  Intermediate: "#F9A825",  // amber – needs attention
  Advanced: "#EF6C00",      // orange – challenging
  "Chef Mode": "#C62828",   // red – expert only
};