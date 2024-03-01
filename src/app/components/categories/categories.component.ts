import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/shared/interface/products';
import { CategoriresService } from 'src/app/shared/services/categorires.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _CategoriresService: CategoriresService) {}
  products: Products[] = [];
  ngOnInit(): void {
    this._CategoriresService.getAllCategories().subscribe({
      next: (response) => {
        this.products = response.data;
        console.log(this.products);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
