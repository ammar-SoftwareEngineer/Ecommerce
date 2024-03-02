import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(private _OrdersService: OrdersService) {}
  ngOnInit(): void {
    this._OrdersService.getAllOrders().subscribe({
      next: (response) => {
        console.log(response.data);
      },
    });
  }
}
