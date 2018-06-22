import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ShellComponent } from './shell/shell.component';
import { NoAuthGuard } from './shared/auth/no-auth-guard.service';
import { AuthGuard } from './shared/auth/auth-guard.service';

const routes: Routes = [

  {
    path: '',
    component: ShellComponent,
    data: { state: 'shell'},
    children: [
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      {
        path: 'products',
        loadChildren: './products/products.module#ProductsModule'
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    component: AuthComponent,
    data: { state: 'auth'},
    children: [
      {path: '', redirectTo: 'sign_in', pathMatch: 'full'},
      {path: 'sign_in', component: LoginFormComponent},
      {path: 'sign_up', component: RegisterFormComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false
    })],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    NoAuthGuard
  ]
})
export class AppRoutingModule {
}
