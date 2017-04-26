import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  public recipeUpdate = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    {
      name: 'Schnitzel', description: 'Very tasty',
      imagePath: 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg',
      ingredients: [{ name: 'French fries', amount: 2 }, { name: 'Pork meat', amount: 1 }]
    },
    {
      name: 'Summer salad', description: 'Okayish',
      imagePath: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/beetroot-feta-grain-salad.jpg',
      ingredients: []
    }
  ];
  constructor() { }

  getRecipes() {
    return this.recipes;
  }
  updateRecipe(recipe: Recipe) {
    this.recipeUpdate.emit(recipe);
  }
}
