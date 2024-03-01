import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Products } from 'src/app/shared/interface/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-productshome',
  templateUrl: './productshome.component.html',
  styleUrls: ['./productshome.component.css'],
})
export class ProductshomeComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _NgToastService: NgToastService
  ) {}

  products: Products[] = [];
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
  addCart(id: string): void {
    this._CartService.AddProductCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._NgToastService.success({
          detail: 'Success',
          summary: 'Product added successfully to your cart',
          duration: 3000,
          position: 'topRight',
        });
        this._CartService.cartNumber.next(response.namOfCartItems);
      },
      error: (err: HttpErrorResponse) => {
        this._NgToastService.error({
          detail: 'ERROR',
          summary: 'There is a problem adding the product in cart',
          position: 'topRight',
        });
      },
    });
  }

  searchTerm: string = '';
}
