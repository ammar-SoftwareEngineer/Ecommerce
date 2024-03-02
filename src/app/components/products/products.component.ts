import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Products } from 'src/app/shared/interface/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;
  isLoading: boolean = false;
  products: Products[] = [];
  wishListData: string[] = [];
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
        console.log(this.wishListData);
      },
    });
  }
  addCart(id: string): void {
    this._CartService.AddProductCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success('Add product to Cart', 'Success', {
          progressAnimation: 'increasing',
        });
        this._WishlistService.WishNumber.next(response.data.length);
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('Error', '', {
          progressAnimation: 'increasing',
        });
      },
    });
  }

  searchTerm: string = '';

  pageChanged(event: any): void {
    this._ProductsService.getAllProducts(event).subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
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
        console.log(this.wishListData);
        this._ToastrService.success('Remove product to Wishlist', 'Success', {
          progressAnimation: 'decreasing',
          timeOut: 600,
        });
      },
    });
  }
}
