import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user/user.service';
import { finalize, first } from 'rxjs/internal/operators';
import { AuthService } from '../shared/auth/auth.service';
import { AuthError } from '../shared/models/auth-error.model';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  private returnUrl: string;
  public registerForm: FormGroup;
  public isRegisterProcess = false;
  public registerError: AuthError = new AuthError();

  constructor(private userService: UserService,
              private authService: AuthService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.createRegisterForm();
  }

  ngOnInit() {

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public onSubmit(): void {

    this.isRegisterProcess = true;
        this.authService.register(this.registerForm.value)
            .pipe(
              first(),
              finalize(() => {
                this.isRegisterProcess = false;
              }))
            .subscribe(
              (data) => {
                    console.log(data);
                    this.router.navigate([this.returnUrl]);
                },
              (error) => {
                     console.log(error);
                     this.registerError = error.error;
                });
  }

  get f() {
    return this.registerForm;
  }

  private createRegisterForm(): void {

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256), Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    }, {validator: this.matchingPasswords('password1', 'password2')});

  }

  private matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }

}
