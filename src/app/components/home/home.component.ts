import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Cart } from 'src/app/shared/interface/cart';
import { Products } from 'src/app/shared/interface/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoriresService } from 'src/app/shared/services/categorires.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private _CategoriresService: CategoriresService,
    private _WishlistService: WishlistService
  ) {}
  products: Products[] = [];
  wishListData: string[] = [];
  ngOnInit(): void {
    this._CategoriresService.getAllCategories().subscribe({
      next: (response) => {
        this.products = response.data;
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
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
      1200: {
        items: 1,
      },
    },
    // nav: true,
  };
  slideDynamic: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 3,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
    nav: true,
  };

  searchTerm: string = '';
}
