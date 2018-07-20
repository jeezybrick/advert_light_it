import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShellComponent } from './shared/components/ui/shell/shell.component';
import { NoAuthGuard } from './shared/guards/no-auth-guard.service';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterFormComponent } from './pages/auth/register-form/register-form.component';
import { LoginFormComponent } from './pages/auth/login-form/login-form.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [

  {
    path: '',
    component: ShellComponent,
    data: { state: 'shell'},
    children: [
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      {
        path: 'products',
        loadChildren: './pages/products/products.module#ProductsModule'
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
