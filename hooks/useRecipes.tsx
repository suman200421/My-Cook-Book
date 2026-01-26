import { getDBConnection } from "@/db/database";
import { Recipe } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type RecipesContextType = {
    recipes: Recipe[];
    addRecipe: (title: string, ingredients: string, recipe: string, vidlink: string, category: Recipe["category"], servings: number, prepTime: number, cooktime: number, difficulty: Recipe['difficulty'], recipeNotes: string) => Promise<Recipe>;
    updatedRecipe: (id: string, title: string, ingredients: string, recipe: string, vidlink: string, category: Recipe["category"], servings: number, prepTime: number, cooktime: number, difficulty: Recipe['difficulty'], recipeNotes: string) => Promise<Recipe | null>;
    deleteRecipe: (id: string) => Promise<void>;
    toggleFavorite: (id: string) => Promise<void>;
    //getRecipeById: (id:string) => Promise<Recipe | null>;
};

const RecipesContext = createContext<RecipesContextType | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const loadRecipes = async () => {
        const db = await getDBConnection();

        // const result = await db.getAllAsync<Recipe>(
        //     "SELECT * FROM recipes ORDER BY rowid DESC"
        // );

        // setRecipes(result);
        const result = await db.getAllAsync<Recipe>(
            "SELECT * FROM recipes ORDER BY rowid DESC"
        );

        const mapped: Recipe[] = result.map((row) => ({
            id: row.id,
            title: row.title,
            ingredients: row.ingredients,
            recipe: row.recipe,
            vidlink: row.vidlink,
            category: row.category,
            difficulty: row.difficulty,   // ✅ FIX
            prepTime: row.prepTime ?? null,
            cookTime: row.cookTime ?? null,
            servings: row.servings ?? null,
            isFavorite: Boolean(row.isFavorite),
            recipeNotes: row.recipeNotes ?? null,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        }));
        setRecipes(mapped);
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    const addRecipe = async (
        title: string,
        ingredients: string,
        recipe: string,
        vidlink: string,
        category: Recipe['category'],
        servings: number,
        prepTime: number,
        cookTime: number,
        difficulty: Recipe['difficulty'],
        recipeNotes: string
    ): Promise<Recipe> => {

        const db = await getDBConnection();
        const now = Date.now();

        const recipen: Recipe = {
            id: uid(),
            title: title.trim(),
            ingredients: ingredients.trim(),
            recipe: recipe.trim(),
            vidlink: vidlink.trim(),
            category,
            servings,
            isFavorite: false,
            prepTime,
            cookTime,
            recipeNotes: recipeNotes.trim(),
            createdAt: now,
            updatedAt: now,
            difficulty
        };
        await db.runAsync(
            `
            INSERT INTO recipes (
                id,
                title,
                ingredients,
                recipe,
                vidlink,
                category,
                difficulty,
                servings,
                prepTime,
                cookTime,
                recipeNotes,
                isFavorite,
                createdAt,
                updatedAt
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [
                recipen.id,
                recipen.title,
                recipen.ingredients,
                recipen.recipe,
                recipen.vidlink,
                recipen.category,
                recipen.difficulty,          // "Intermediate"
                recipen.servings,            // 2
                recipen.prepTime,            // 10
                recipen.cookTime,            // 35
                recipen.recipeNotes,         // "Ysbsnj"
                recipen.isFavorite ? 1 : 0,
                recipen.createdAt,
                recipen.updatedAt,
            ]
        );



        setRecipes((prevRecipes) => [recipen, ...prevRecipes]);
        return recipen;
    };

    const updatedRecipe = async (
        id: string,
        title: string,
        ingredients: string,
        recipe: string,
        vidlink: string,
        category: Recipe['category'],
        servings: number,
        prepTime: number,
        cookTime: number,
        difficulty: Recipe['difficulty'],
        recipeNotes: string
    ): Promise<Recipe | null> => {
        const db = await getDBConnection();
        const now = Date.now();

        await db.runAsync(
            `UPDATE recipes
            SET title = ?,
            ingredients = ?,
            recipe = ?,
            vidlink = ?,
            category = ?,
            servings = ?,
            prepTime = ?,
            cookTime = ?,
            updatedAt = ?,
            difficulty = ?,
            recipeNotes = ?
            WHERE id = ?`,
            [
                title.trim(),
                ingredients.trim(),
                recipe.trim(),
                vidlink.trim(),
                category,
                difficulty ?? null,
                servings ?? null,
                prepTime ?? null,
                cookTime ?? null,
                now,
                id,
            ]
        );

        let updatedRecipe: Recipe | null = null;

        setRecipes((prev) =>
            prev.map((r) => {
                if (r.id === id) {
                    updatedRecipe = {
                        ...r,
                        title: title.trim(),
                        ingredients: ingredients.trim(),
                        recipe: recipe.trim(),
                        vidlink: vidlink.trim(),
                        category,
                        updatedAt: now,
                        servings,
                        prepTime,
                        cookTime,
                        difficulty: difficulty ?? null,
                        recipeNotes: recipeNotes.trim(),
                    };
                    return updatedRecipe;
                }
                return r;
            }
            ));
        return updatedRecipe;
    };

    const toggleFavorite = async (id: string) => {
        const db = await getDBConnection();

        setRecipes((prev) =>
            prev.map((r) => {
                if (r.id === id) {
                    const updated = { ...r, isFavorite: !r.isFavorite };

                    db.runAsync(
                        `UPDATE recipes SET isFavorite = ?, updatedAt = ? WHERE id = ?`,
                        [updated.isFavorite ? 1 : 0, Date.now(), id]
                    );

                    return updated;
                }
                return r;
            })
        );
    };


    const deleteRecipe = async (id: string) => {
        const db = await getDBConnection();

        // delete from database
        await db.runAsync(
            `DELETE FROM recipes WHERE id = ?`,
            [id]
        );

        // delete from state
        setRecipes((prev) => prev.filter((r) => r.id !== id));
    };



    return (
        <RecipesContext.Provider value={{ recipes, addRecipe, updatedRecipe, deleteRecipe, toggleFavorite }}>
            {children}
        </RecipesContext.Provider>
    )
};
export function useRecipes() {
    const context = useContext(RecipesContext);
    if (!context) {
        throw new Error("useRecipes must be used within a RecipesProvider");
    }
    return context;
}