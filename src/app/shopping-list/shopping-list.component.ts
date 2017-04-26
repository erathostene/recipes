import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../recipes/ingredient';

import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit {
  private ingredients: Ingredient[];
  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.sls.getItems();
  }

}
