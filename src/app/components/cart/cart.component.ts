import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/interface/cart';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/shared/interface/products';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  products: Products[] = [];
  productCart: Cart = {} as Cart;
  cartDetails: Cart[] = [];
  msg: string = 'Your Cart Empty';
  totalPrice: Cart[] = [];
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.productCart = response.data;
        this.cartDetails = response.data.products;
        this.products = response.data._id;
        console.log(this.products);
      },
    });
  }
  deleteProduct(productId: string): void {
    this._CartService.deleteProductCart(productId).subscribe({
      next: (response) => {
        this.productCart = response.data;
        this.cartDetails = response.data.products;
        this._ToastrService.success('Remove product to Cart', 'Success', {
          progressAnimation: 'decreasing',
          timeOut: 600,
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
          this.productCart = response.data;
        },
      });
    }
  }
  deleteAllCart(): void {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if (response.message == 'success') {
          this.cartDetails = response.data;
          this._ToastrService.success('Remove All product to Cart', 'Success', {
            progressAnimation: 'decreasing',
            timeOut: 1200,
          });
          this._CartService.cartNumber.next(response.numOfCartItems);
        }
      },
    });
  }
}
