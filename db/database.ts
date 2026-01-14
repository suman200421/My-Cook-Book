import * as SQLite from 'expo-sqlite';

export let db: SQLite.SQLiteDatabase | null = null;

export const getDBConnection = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('recipesrn.db');

    await db.execAsync(
      `
        CREATE TABLE IF NOT EXISTS recipes (
            id TEXT PRIMARY KEY NOT NULL UNIQUE,
            title TEXT NOT NULL,
            ingredients TEXT NOT NULL,
            recipe TEXT NOT NULL,
            vidlink TEXT,
            category TEXT NOT NULL,
            createdAt INTEGER NOT NULL,
            updatedAt INTEGER NOT NULL
        );
    `
    );
  }
  return db;
};