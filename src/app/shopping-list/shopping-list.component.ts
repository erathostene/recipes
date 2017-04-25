import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../recipes/ingredient';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit {

  private ingredients: Ingredient[];
  constructor() { }

  ngOnInit() {
  }

}
