import { getDBConnection } from "@/db/database";
import { Recipe } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type RecipesContextType={
    recipes: Recipe[];
    addRecipe: (title:string, ingredients:string, recipe:string, vidlink:string, category: Recipe["category"]) => Promise<Recipe>;
    updatedRecipe: (id:string, title:string, ingredients:string, recipe:string, vidlink:string, category: Recipe["category"]) => Promise<Recipe|null>;
    deleteRecipe: (id:string) => Promise<void>;
    //getRecipeById: (id:string) => Promise<Recipe | null>;
};

const RecipesContext = createContext<RecipesContextType | null>(null);

const uid = () => Math.random().toString(36).slice(2,10);

export const RecipesProvider = ({children}:{children: ReactNode})=>{
    const [recipes,setRecipes]=useState<Recipe[]>([]);

    const loadRecipes = async () => {
        const db = await getDBConnection();

        const result = await db.getAllAsync<Recipe>(
            "SELECT * FROM recipes ORDER BY rowid DESC"
        );

        setRecipes(result);
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    const addRecipe = async (
        title:string,
        ingredients:string,
        recipe:string,
        vidlink:string,
        category:Recipe['category']
    ): Promise<Recipe> => {

        const db = await getDBConnection();
        const now =Date.now();

        const recipen: Recipe = {
            id:uid(),
            title: title.trim(),
            ingredients: ingredients.trim(),
            recipe: recipe.trim(),
            vidlink: vidlink.trim(),
            category,
            createdAt: now,
            updatedAt: now,
        };

        await db.runAsync(
        `INSERT INTO recipes (id, title, ingredients, recipe, vidlink, category, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
            recipen.id,
            recipen.title,
            recipen.ingredients,
            recipen.recipe,
            recipen.vidlink,
            recipen.category,
            recipen.createdAt,
            recipen.updatedAt
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
        category: Recipe['category']
    ): Promise<Recipe | null> => {
        const db = await getDBConnection();
        const now = Date.now();

        await db.runAsync(
            `UPDATE recipes
            SET title = ?, ingredients = ?, recipe = ?, vidlink = ?, category = ?, updatedAt = ?
            WHERE id = ?`,
        [
            title.trim(),
            ingredients.trim(),
            recipe.trim(),
            vidlink.trim(),
            category,
            now,
            id,
        ]
    );

    let updatedRecipe: Recipe | null = null;

    setRecipes((prev) =>
        prev.map((r) => {
            if(r.id === id){
                updatedRecipe = {
                    ...r,
                    title: title.trim(),
                    ingredients: ingredients.trim(),
                    recipe: recipe.trim(),
                    vidlink: vidlink.trim(),
                    category,
                    updatedAt: now,
                };
                return updatedRecipe;
            }
            return r;
        }
    ));
    return updatedRecipe;
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
        <RecipesContext.Provider value={{recipes, addRecipe, updatedRecipe, deleteRecipe}}>
            {children}
        </RecipesContext.Provider>
    )
};
export function useRecipes(){
    const context =useContext(RecipesContext);
    if(!context){
        throw new Error("useRecipes must be used within a RecipesProvider");
    }
    return context;
}