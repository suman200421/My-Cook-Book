export type Recipe={
    id:string;
    title:string;
    ingredients:string;

    recipe:string;
    vidlink:string;

    isFavorite?:boolean;
    servings?:number;
    prepTime?:number;
    cookTime?:number;
    difficulty?: 
  | "Beginner"
  | "Easy"
  | "Intermediate"
  | "Advanced"
  | "Chef Mode";

    recipeNotes:string;

    createdAt:number;
    updatedAt:number;
    category:"Main course" | "Dessert" | "Appetizer" | "Beverage" | "Salad" | "Soup" | "Snack" | "Bread" | "Sauce" | "Side dish" | "Breakfast" | "Other";
}