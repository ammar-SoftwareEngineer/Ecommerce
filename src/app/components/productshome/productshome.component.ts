import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Products } from 'src/app/shared/interface/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productshome',
  templateUrl: './productshome.component.html',
  styleUrls: ['./productshome.component.css'],
})
export class ProductshomeComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
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
        this._ToastrService.success('Add product to Cart', 'Success', {
          progressAnimation: 'increasing',
        });
        this._CartService.cartNumber.next(response.namOfCartItems);
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error('Error', '', {
          progressAnimation: 'increasing',
        });
      },
    });
  }

  searchTerm: string = '';
}
