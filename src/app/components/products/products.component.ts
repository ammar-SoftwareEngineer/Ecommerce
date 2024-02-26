import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Products } from 'src/app/shared/interface/products';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(private _ProductsService: ProductsService) {}
  products: Products[] = [];
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        // console.log(this.product);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
