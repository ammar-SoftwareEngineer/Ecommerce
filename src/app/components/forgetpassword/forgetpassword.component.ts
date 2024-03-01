import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {}
  @ViewChild('model') model!: ElementRef;
  openModel() {
    let divModel = document.getElementById('staticBackdrop');
    if (divModel != null) {
      divModel.style.display = 'block';
    }
  }
  closeModel() {
    let divModel = document.getElementById('staticBackdrop');
    if (divModel != null) {
      divModel.style.display = 'none';
    }
  }
  isShow: boolean = false;
  msgError: string = '';
  isLoading: boolean = false;

  forgetPassword: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  verificationCode: FormGroup = this._FormBuilder.group({
    resetCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  });

  handlForgetPassword(): void {
    if (this.forgetPassword.valid) {
      this.isLoading = true;
      this._AuthService.forgetPassword(this.forgetPassword.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          if (response.statusMsg === 'success') {
            this.openModel();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }

  handlverificationCode(): void {
    if (this.verificationCode.valid) {
      this.isLoading = true;
      this._AuthService.verifyReset(this.verificationCode.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          if (response.status == 'Success') {
            this._Router.navigate(['/resetpassword']);
            // localStorage.setItem('token', response.token);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
}
