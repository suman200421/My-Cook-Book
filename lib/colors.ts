export const colors = {
  bg: '#FFF9F2',
  card: '#FFFFFF',
  text: '#3E2723',
  sub: '#A1887F',
  input: '#FFF2E6',
  border: '#EDDBC7',
  accent: '#D84315', 
  // Functional food colors
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
