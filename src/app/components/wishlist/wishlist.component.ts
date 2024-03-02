import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/shared/interface/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService,
    private _CartService: CartService
  ) {}

  products: Products[] = [];
  isLoading: boolean = false;
  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.data;
        this._WishlistService.WishNumber.next(response.count);
      },
    });
  }
  addCart(id: string): void {
    this._CartService.AddProductCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('Add product to Cart', 'Success', {
          progressAnimation: 'increasing',
        });
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('Error', '', {
          progressAnimation: 'increasing',
        });
      },
    });
  }
  addFav(prodId: string): void {
    this._WishlistService.addProductsWishlist(prodId).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('Add product to WishList', 'Success', {
          progressAnimation: 'increasing',
        });
      },
    });
  }
  deleteFav(id: string): void {
    this._WishlistService.removeProductWishList(id).subscribe({
      next: (response) => {
        this._WishlistService.getWishList().subscribe({
          next: (response) => {
            this.products = response.data;
            this._WishlistService.WishNumber.next(response.count);
          },
        });
        console.log(response);
        this._ToastrService.success('Remove product to Wishlist', 'Success', {
          progressAnimation: 'decreasing',
          timeOut: 600,
        });
      },
    });
  }
}
