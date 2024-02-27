import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Products } from 'src/app/shared/interface/products';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private _ProductsService: ProductsService) {}
  products: Products = {} as Products;
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
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
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
      1200: {
        items: 1,
      },
    },
    // nav: true,
  };
}
