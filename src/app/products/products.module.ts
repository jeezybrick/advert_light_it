import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductResolver } from '../shared/services/product/product.resolver';

const productRoutes: Routes = [
  { path: '', component: ProductsListComponent },
  {
    path: ':id',
    resolve: { product: ProductResolver },
    component: ProductDetailComponent
  }
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
  ]
})
export class ProductsModule { }
