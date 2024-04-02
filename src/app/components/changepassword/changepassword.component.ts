import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
})
export class ChangepasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {}
  isLoading: boolean = false;
  changePassword: FormGroup = this._FormBuilder.group(
    {
      currentPassword: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)],
      ],
      rePassword: [''],
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );
  confirmPassword(group: FormGroup): void {
    let password = group.get('password');
    let rePassword = group.get('rePassword');
    if (rePassword?.value == '') {
      rePassword?.setErrors({ required: true });
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({
        mismatch: true,
      });
    }
  }

  handlePassword(): void {
    if (this.changePassword.valid) {
      this.isLoading = true;
      this._AuthService.changePassword(this.changePassword.value).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          if (response.message == 'success') {
            this._AuthService.logOut();
          }
        },
      });
    }
  }
}
