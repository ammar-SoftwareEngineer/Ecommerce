import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Products } from 'src/app/shared/interface/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
@Component({
  selector: 'app-productshome',
  templateUrl: './productshome.component.html',
  styleUrls: ['./productshome.component.css'],
})
export class ProductshomeComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  products: Products[] = [];
  wishListData: string[] = [];
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        // console.log(this.products);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
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
        this._WishlistService.WishNumber.next(response.data.length);
        this.wishListData = response.data;
      },
    });
  }
  deleteFav(id: string): void {
    this._WishlistService.removeProductWishList(id).subscribe({
      next: (response) => {
        this._WishlistService.WishNumber.next(response.data.length);
        this.wishListData = response.data;
        this._ToastrService.success('Remove product to Wishlist', 'Success', {
          progressAnimation: 'decreasing',
          timeOut: 600,
        });
      },
    });
  }

  searchTerm: string = '';
}
