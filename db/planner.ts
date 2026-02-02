import { getDBConnection } from "@/db/database";

export async function savePlannedRecipes(
  date: string,
  recipeIds: string[]
) {
  const db = await getDBConnection();

  // Clear existing plans for this date (optional but recommended)
  await db.runAsync(
    "DELETE FROM meal_plans WHERE date = ?",
    [date]
  );

  // Insert new selections
  for (const recipeId of recipeIds) {
    await db.runAsync(
      "INSERT INTO meal_plans (date, recipeId) VALUES (?, ?)",
      [date, recipeId]
    );
  }
}

export async function getPlannedRecipesForDate(date: string) {
  const db = await getDBConnection();

  return db.getAllAsync<{ recipeId: string }[]>(
    "SELECT recipeId FROM meal_plans WHERE date = ?",
    [date]
  );
}
