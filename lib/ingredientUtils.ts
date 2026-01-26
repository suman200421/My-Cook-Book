import { Recipe } from "@/types";


// lib/ingredientUtils.ts

export const normalizeIngredient = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim();
};

export const extractIngredientsFromRecipe = (ingredients: string) => {
  return ingredients
    .split(",")
    .map((item) => {
      const parts = item.trim().split(" ");
      // remove qty + unit → keep name
      return normalizeIngredient(parts.slice(2).join(" ") || item);
    })
    .filter(Boolean);
};

export const matchRecipesByIngredients = (
  recipes: Recipe[],
  userIngredients: string[]
) => {
  const normalizedUser = userIngredients.map(normalizeIngredient);

  return recipes
    .map((recipe) => {
      const recipeIngredients = extractIngredientsFromRecipe(
        recipe.ingredients
      );

      const matched = recipeIngredients.filter((ing) =>
        normalizedUser.includes(ing)
      );

      return {
        recipe,
        matchedCount: matched.length,
        totalCount: recipeIngredients.length,
      };
    })
    .filter((r) => r.matchedCount > 0)
    .sort((a, b) => b.matchedCount - a.matchedCount);
};
