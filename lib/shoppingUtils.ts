import { GroceryItem, IngredientInput } from "@/types";

const normalize = (text: string) =>
  text.toLowerCase().replace(/[^a-z\s]/g, "").trim();

export function generateGroceryList(
  recipes: { ingredients: IngredientInput[] }[]
): GroceryItem[] {
  const map = new Map<string, GroceryItem>();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => {
      if (!ing.name) return;

      const name = normalize(ing.name);
      const unit = ing.unit?.trim() || "";
      const key = `${name}|${unit}`;

      if (map.has(key)) {
        const existing = map.get(key)!;
        if (
          typeof existing.quantity === "number" &&
          typeof ing.quantity === "number"
        ) {
          existing.quantity += ing.quantity;
        }
      } else {
        map.set(key, {
          name,
          quantity: ing.quantity,
          unit: ing.unit,
          checked: false,
        });
      }
    });
  });

  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}
