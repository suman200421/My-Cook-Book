import * as SQLite from 'expo-sqlite';

export let db: SQLite.SQLiteDatabase | null = null;

export const getDBConnection = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('recipesrn_v2.db');

    await db.execAsync(
      `
        CREATE TABLE IF NOT EXISTS recipes (
            id TEXT PRIMARY KEY NOT NULL UNIQUE,
            title TEXT NOT NULL,
            ingredients TEXT NOT NULL, 
            recipe TEXT NOT NULL,
            vidlink TEXT,
            category TEXT NOT NULL,
            difficulty TEXT NOT NULL DEFAULT "Easy",
            servings INTEGER,
            prepTime INTEGER,
            cookTime INTEGER,
            recipeNotes TEXT,
            isFavorite INTEGER NOT NULL DEFAULT 0,
            createdAt INTEGER NOT NULL,
            updatedAt INTEGER NOT NULL
        );
    `
    );
    await db.execAsync(
      `
        CREATE TABLE IF NOT EXISTS meal_plans (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          recipeId TEXT NOT NULL
        );
      `
    );

  }
  return db;
};