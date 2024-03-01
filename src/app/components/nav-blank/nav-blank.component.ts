import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/interface/cart';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}
  cartNum: number = 0;
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNum = data;
      },
    });
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartNum = response.numOfCartItems;
      },
    });
  }
  logOutUser(): void {
    this._AuthService.logOut();
  }
}
