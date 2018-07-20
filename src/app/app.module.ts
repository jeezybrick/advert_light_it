import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './pages/auth/auth.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/components/ui/header/header.component';
import { FooterComponent } from './shared/components/ui/footer/footer.component';
import { SidebarComponent } from './shared/components/ui/sidebar/sidebar.component';
import { LoginFormComponent } from './pages/auth/login-form/login-form.component';
import { RegisterFormComponent } from './pages/auth/register-form/register-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserAreaComponent } from './shared/components/ui/user-area/user-area.component';
import { ShellComponent } from './shared/components/ui/shell/shell.component';
import { ProgressBarComponent } from './shared/components/ui/progress-bar/progress-bar.component';
import { CartComponent } from './pages/cart/cart.component';
import { SharedModule } from './shared/shared.module';
import { SearchInputComponent } from './shared/components/ui/search-input/search-input.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SearchInputComponent,
    UserAreaComponent,
    ShellComponent,
    ProgressBarComponent,
    ProfileComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
