import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';



@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  private selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService, private sls: ShoppingListService) { }


  ngOnInit() {
    this.recipeService.recipeUpdate.subscribe(
      updatedRecipe => this.selectedRecipe = updatedRecipe,
      err => console.log(err)
    );
  }
  onAddToSL() {
    this.sls.addItems(this.selectedRecipe.ingredients);
  }

}
