// products-routing.module.ts
// [Samuel Kalain]

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products-form/products-form.component';

const routes: Routes = [
  { path: 'list', component: ProductsListComponent },
  { path: 'form', component: ProductsFormComponent },
  { path: 'form/:id', component: ProductsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
