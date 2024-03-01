import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Products } from 'src/app/shared/interface/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _NgToastService: NgToastService
  ) {}
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;

  products: Products[] = [];
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
        this._CartService.cartNumber.next(response.numOfCartItems);
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
}
