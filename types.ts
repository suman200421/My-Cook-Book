export type Recipe={
    id:string;
    title:string;
    ingredients:string;

    recipe:string;
    vidlink:string;

    isFavorite:boolean;
    servings:number|null;
    prepTime:number|null;
    cookTime:number|null;
    difficulty: 
  | "Beginner"
  | "Easy"
  | "Intermediate"
  | "Advanced"
  | "Chef Mode";

    recipeNotes:string|null;

    createdAt:number;
    updatedAt:number;
    category:"Main course" | "Dessert" | "Appetizer" | "Beverage" | "Salad" | "Soup" | "Snack" | "Bread" | "Sauce" | "Side dish" | "Breakfast" | "Other";
}