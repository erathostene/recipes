import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe';

import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class RecipeService {
  public recipeChanged = new EventEmitter<Recipe[]>();
  public recipeUpdate = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    {
      name: 'Schnitzel', description: 'Very tasty',
      imagePath: 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg',
      ingredients: [{ name: 'French fries', amount: 2 }, { name: 'Pork meat', amount: 1 }]
    },
    {
      name: 'Summer salad', description: 'Okayish',
      imagePath: 'https://www.bbcgoodfood.com/sites/default/files/'
      + 'recipe-collections/collection-image/2013/05/beetroot-feta-grain-salad.jpg',
      ingredients: []
    }
  ];
  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
  editRecipe(oldRecipe: Recipe, newrecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newrecipe;
  }
  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipebook-42a26.firebaseio.com/recipes.json', body, { headers: headers });
  }
  fetchData() {
    return this.http
      .get('https://recipebook-42a26.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
        this.recipeChanged.emit(this.recipes);
      }
      );
  }
}


