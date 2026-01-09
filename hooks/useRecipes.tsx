import { Recipe } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type RecipesContextType={
    recipes: Recipe[];
    addRecipe: (title:string, ingredients:string, recipe:string, vidlink:string) => Recipe;
};

const RecipesContext = createContext<RecipesContextType | null>(null);

const uid = () => Math.random().toString(36).slice(2,10);

export const RecipesProvider = ({children}:{children: ReactNode})=>{
    const [recipes,setRecipes]=useState<Recipe[]>([]);

    const addRecipe = (title:string, ingredients:string, recipe:string, vidlink:string) => {
        const t =title.trim()
        const i =ingredients.trim()
        const r =recipe.trim()
        const v =vidlink.trim()
        const recipen: Recipe = {
            id:uid(),
            title: t,
            ingredients: i,
            recipe: r,
            vidlink: v,
            pinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        setRecipes((prevRecipes) => [recipen, ...prevRecipes]);
        return recipen;
    };

    return (
        <RecipesContext.Provider value={{recipes, addRecipe}}>
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