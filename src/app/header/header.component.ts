import { Component } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';


@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService) { }

  onStore() {
    this.recipeService.storeData()
      .subscribe(
      data => console.log(data),
      err => console.log(err)
      );
  }
  onFetch() {
    this.recipeService.fetchData();
  }
}
