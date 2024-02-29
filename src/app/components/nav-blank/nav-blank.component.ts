import { Component } from '@angular/core';
import { Cart } from 'src/app/shared/interface/cart';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}
  logOutUser(): void {
    this._AuthService.logOut();
  }
}
