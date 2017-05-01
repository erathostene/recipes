import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from '../shopping-list/shopping-list.component';


const rbRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(rbRoutes)
  ],
  exports: [RouterModule],
})
export class RoutingModule { }
