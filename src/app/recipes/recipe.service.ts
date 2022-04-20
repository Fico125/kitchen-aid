import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Mamma Mia Burger', 
    //         'Simply, the best burger ever', 
    //         'https://www.seriouseats.com/thmb/gsco3uhFd26vcJNlJfJQi8tDs0g=/1125x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__09__20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus-f7d9042bdc2a468fbbd50b10d467dafd.jpg',
    //         [
    //             new Ingredient('Meat', 2),
    //             new Ingredient('Bun', 1),
    //             new Ingredient('BBQ Mix', 1)
    //         ]),
    //     new Recipe(
    //         'Lasagna', 
    //         'Doesn\'t really need a description, does it?', 
    //         'https://www.365daysofbakingandmore.com/wp-content/uploads/2011/02/Lasagna-TOP.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Cheese', 5),
    //             new Ingredient('Pasta', 10)
    //         ])
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
         return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index , 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}