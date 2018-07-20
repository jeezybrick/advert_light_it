import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs/internal/operators';

import { AuthError } from '../../../shared/models/auth-error.model';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private returnUrl: string;
  public loginForm: FormGroup;
  public isLoginProcess = false;
  public loginError: AuthError = new AuthError();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
    this.createLoginForm();
  }

  ngOnInit() {

    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  private createLoginForm(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  get f() {
    return this.loginForm;
  }

  public onSubmit(): void {

    this.isLoginProcess = true;
    this.loginError = new AuthError();

    this.authService.login(this.loginForm.value)
      .pipe(
        first(),
        finalize(() => {
          this.isLoginProcess = false;
        }))
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.loginError = error.error;
        });
  }

  public isInvalid(fieldName: string) {
    return ((this.f.get(fieldName).invalid) && this.f.get(fieldName).touched) || this.loginError[fieldName];
  }
}
