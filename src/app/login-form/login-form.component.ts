import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs/internal/operators';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private returnUrl: string;
  public loginForm: FormGroup;
  public isLoginProcess = false;


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
    this.createLoginForm();
  }

  ngOnInit() {

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  private createLoginForm(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });

  }

  public onSubmit(): void {

    this.isLoginProcess = true;

    this.authService.login(this.loginForm.value)
      .pipe(
        first(),
        finalize(() => {
          this.isLoginProcess = false;
        }))
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          console.log(error);
        });
  }
}
