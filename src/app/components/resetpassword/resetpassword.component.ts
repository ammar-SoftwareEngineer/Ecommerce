import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {}

  msgError: string = '';
  isLoading: boolean = false;
  resetpassword: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)],
    ],
  });
  handlResetPassword(): void {
    if (this.resetpassword.valid) {
      this.isLoading = true;
      this._AuthService.resetPassword(this.resetpassword.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          this._Router.navigate(['/login']);
          localStorage.setItem('token', response.token);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
}
