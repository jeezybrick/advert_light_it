import { Routes } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { ProductResolver } from './product.resolver';

export const productRoutes: Routes = [
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
