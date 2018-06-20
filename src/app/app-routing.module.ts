import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './products-list/products-list.component';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { NoAuthPagesComponent } from './no-auth-pages/no-auth-pages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [

  { path: '', component: AppComponent, children: [
      {
        path: '',
        component: NoAuthPagesComponent,
        children: [
          { path: '', redirectTo: 'products_list', pathMatch: 'full' },
          { path: 'products_list', component: ProductsListComponent },
          { path: 'products_list/:id', component: ProductDetailComponent },
        ]
      },
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          { path: '', redirectTo: 'sign_in', pathMatch: 'full' },
          { path: 'sign_in', component: LoginFormComponent },
          { path: 'sign_up', component: RegisterFormComponent }
        ]
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false
    })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
