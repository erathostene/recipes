import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe';



@Component({
  selector: 'rb-recipes-list',
  templateUrl: './recipes-list.component.html',
})
export class RecipesListComponent implements OnInit {
  private recipes: Recipe[] = [
    {
      name: 'Schnitzel', description: 'Very tasty',
      imagePath: 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg',
      ingredients: []
    },
    {
      name: 'Summer salad', description: 'Okayish',
      imagePath: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/beetroot-feta-grain-salad.jpg',
      ingredients: []
    }
  ];
  @Output() selectedRecipe = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit() {
  }

  onSelected(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
