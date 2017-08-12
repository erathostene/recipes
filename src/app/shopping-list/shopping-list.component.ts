import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../recipes/ingredient';

import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  selectedItem: Ingredient = null;

  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.sls.getItems();
  }

  onSelectIngredient(ingredient: Ingredient) {
    this.selectedItem = ingredient;
  }
  onCleared() {
    this.selectedItem = null;
  }
}
