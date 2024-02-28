import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/interface/cart';
import { Products } from 'src/app/shared/interface/products';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  productCart: Cart = {} as Cart;
  cartDetails: Cart[] = [];
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.productCart = response.data;
        this.cartDetails = response.data.products;
        console.log(this.cartDetails);
      },
    });
  }
}
