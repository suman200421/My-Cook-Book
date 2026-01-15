export type Recipe={
    id:string;
    title:string;
    ingredients:string;

    /*mainIngredients:string;
    otherIngredients:string;*/
    recipe:string;
    vidlink:string;

    //servings?:number;
    //totalTime?:number; //in minutes

    //difficulty?:"Easy" | "Medium" | "Hard";

    createdAt:number;
    updatedAt:number;
    category:"Main course" | "Dessert" | "Appetizer" | "Beverage" | "Salad" | "Soup" | "Snack" | "Bread" | "Sauce" | "Side dish" | "Breakfast" | "Other";
}