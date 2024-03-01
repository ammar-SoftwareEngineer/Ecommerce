import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/shared/interface/products';
import { BrandsService } from 'src/app/shared/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandsService) {}
  products: Products[] = [];
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
        console.log(this.products);
      },
    });
  }

  pageChanged(event: any): void {
    this._BrandsService.getAllBrands(event).subscribe({
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
