import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';

import { RecipeService } from '../recipe.service';

import { Subject } from 'rxjs/Subject';

import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: ['.list-group-item{ border: none;}']

})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  recipeIndex: number;
  recipe: Recipe = null;
  isNew = true;
  recipeForm: FormGroup;
  recipeIngredients: FormArray = new FormArray([]);


  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
      (param: Params) => {
        if (param.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeIndex = +param['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        } else {
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  navigateBack() {
    this.router.navigate(['../']);
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';

    if (!this.isNew) {
      this.recipe.ingredients = this.recipe.ingredients || [];
      for (let i = 0; i < this.recipe.ingredients.length; i++) {
        this.recipeIngredients.push(
          new FormGroup({
            name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
            amount: new FormControl(this.recipe.ingredients[i].amount, [Validators.required, Validators.pattern('\\d+')])
          })
        );
      }
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;
    }

    this.recipeForm = this.fb.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: this.recipeIngredients
    });
  }
  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe)
    }
    this.navigateBack();
  }
  onAddItem(name: string, amount: string) {
    this.recipeIngredients.push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [Validators.required, Validators.pattern('\\d+')])
      })
    );
  }
  onRemoveItem(index: number) {
    this.recipeIngredients.removeAt(index);
  }
}
