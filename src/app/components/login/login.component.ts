import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  msgError: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)],
    ],
  });
  handleLoginForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message == 'success') {
            localStorage.setItem('email', response.user.email);
            this._Router.navigate(['/home']);
            localStorage.setItem('token', response.token);
          }
          console.log(response);
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
