import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      userData
    );
  }
  setLogin(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      userData
    );
  }

  logOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }

  forgetPassword(email: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      email
    );
  }
  verifyReset(resetCode: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      resetCode
    );
  }
  resetPassword(userData: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      userData
    );
  }
}
