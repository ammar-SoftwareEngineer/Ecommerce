import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/interface/cart';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}
  cartNum: number = 0;
  wishNum: number = 0;
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
    this._WishlistService.WishNumber.subscribe({
      next: (data) => {
        this.wishNum = data;
      },
    });
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this.wishNum = response.count;
      },
    });
  }
  logOutUser(): void {
    this._AuthService.logOut();
  }
}
