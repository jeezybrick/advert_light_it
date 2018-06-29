import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SharedModule } from './shared/shared.module';
import { TokenInterceptor } from './shared/auth/token.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { ErrorInterceptor } from './shared/auth/error.interceptor';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { SearchInputComponent } from './ui/search-input/search-input.component';
import { UserAreaComponent } from './ui/user-area/user-area.component';
import { ShellComponent } from './ui/shell/shell.component';
import { ProgressBarComponent } from './ui/progress-bar/progress-bar.component';


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
