import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: '', component: AppComponent,  children: [
    {
        path: '',
        component: CrisisListComponent
      },
      {
        path: 'auth',
        component: CrisisListComponent
      }
    ]},
  {path: 'products_list', component: ProductsListComponent},
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: true // <-- debugging purposes only
    })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
