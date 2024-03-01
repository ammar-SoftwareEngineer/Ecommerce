import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/interface/cart';
import { CartService } from 'src/app/shared/services/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { count } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _NgToastService: NgToastService
  ) {}
  productCart: Cart = {} as Cart;
  cartDetails: Cart[] = [];
  msg: string = 'Your Cart Empty';

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.productCart = response.data;
        this.cartDetails = response.data.products;
        console.log(this.cartDetails);
      },
    });
  }
  deleteProduct(productId: string): void {
    this._CartService.deleteProductCart(productId).subscribe({
      next: (response) => {
        this.productCart = response.data;
        this.cartDetails = response.data.products;
        this._NgToastService.success({
          detail: 'Success',
          summary: 'Product Remove successfully to your cart',
          duration: 3000,
          position: 'topRight',
        });
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  changeCount(id: string, countPro: number): void {
    if (countPro >= 1) {
      this._CartService.updateProductCart(id, countPro).subscribe({
        next: (response) => {
          this.cartDetails = response.data.products;
          console.log(this.cartDetails);
        },
      });
    }
  }
  deleteAllCart(): void {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if (response.message == 'success') {
          this.cartDetails = response.data;
          this._NgToastService.success({
            detail: 'Success',
            summary: 'Product Remove All Products successfully to your cart',
            duration: 2000,
            position: 'topRight',
          });
          this._CartService.cartNumber.next(response.numOfCartItems);
        }
      },
    });
  }
}
