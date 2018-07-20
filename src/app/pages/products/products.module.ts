import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { productRoutes } from './products.route';
import { SharedModule } from '../../shared/shared.module';

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
