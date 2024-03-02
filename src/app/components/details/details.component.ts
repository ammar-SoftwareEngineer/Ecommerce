import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Products } from 'src/app/shared/interface/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  productDetails: Products = {} as Products;
  wishListData: string[] = [];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idProducts: any = params.get('id');
        this._ProductsService.getIdProducts(idProducts).subscribe({
          next: (response) => {
            this.productDetails = response.data;
            console.log(this.productDetails);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
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
        console.log(response);
        this._WishlistService.WishNumber.next(response.data.length);
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success('Add product to Cart', 'Success', {
          progressAnimation: 'increasing',
        });
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('Error', '', {
          progressAnimation: 'increasing',
        });
      },
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    // nav: true,
  };
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
