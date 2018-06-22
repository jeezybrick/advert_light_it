import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductResolver } from '../shared/services/product/product.resolver';
import { ProductAddComponent } from './product-add/product-add.component';
import { AuthGuard } from '../shared/auth/auth-guard.service';
import { ProductEditComponent } from './product-edit/product-edit.component';

const productRoutes: Routes = [
  { path: '', component: ProductsListComponent },
  {
    path: 'add',
    component: ProductAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    resolve: { product: ProductResolver },
    component: ProductDetailComponent
  },
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(productRoutes)
  ],
  declarations: [
    ProductsListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ProductEditComponent,
  ]
})
export class ProductsModule { }
