import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/shared/interface/cart';
import { Orders } from 'src/app/shared/interface/orders';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  constructor(
    private _OrdersService: OrdersService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  filteredData: any;
  id: string[] = [];
  data: Cart[] = [];
  idPro: any;
  ngOnInit(): void {
    this._OrdersService.getAllOrders().subscribe({
      next: (response) => {
        this.filteredData = response.data
          .filter(
            (item: any) => item.user.email === localStorage.getItem('email')
          )
          .map((item: any) => this.id.push(item.user._id));

        this._OrdersService.getUserOrders(this.id[0]).subscribe({
          next: (res) => {
            this._ActivatedRoute.paramMap.subscribe({
              next: (params) => {
                this.idPro = params.get('id');
                this.data = res
                  .filter((item: any) => item._id == this.idPro)
                  .map((item: any) => item.cartItems)[0];
              },
            });
          },
        });
      },
    });
  }
}
