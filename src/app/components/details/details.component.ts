import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Products } from 'src/app/shared/interface/products';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {}
  productDetails: Products = {} as Products;
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
    },
    // nav: true,
  };
}
