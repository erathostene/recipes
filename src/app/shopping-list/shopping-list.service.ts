// import { Injectable } from '@angular/core';
import { Ingredient } from '../recipes/ingredient';

// @Injectable()
export class ShoppingListService {
  private items: Ingredient[] = [];
  constructor() { }

  getItems() {
    return this.items;
  }
  addItems(items: Ingredient[]) {
    // Array.prototype.push.apply(this.items,items);
    this.items.push(...items);
  }
}
