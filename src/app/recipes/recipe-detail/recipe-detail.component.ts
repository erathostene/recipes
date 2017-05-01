import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private selectedRecipe: Recipe;
  private recipeIndex: number;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private recipeService: RecipeService,
    private sls: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
      (param: Params) => {
        this.recipeIndex = param['id'];
        this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
      }
      );
  }
  onAddToSL() {
    this.sls.addItems(this.selectedRecipe.ingredients);
  }

  onEdit() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit'])
  }
  onDelete() {
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
