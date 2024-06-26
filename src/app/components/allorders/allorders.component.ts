import { identifierName } from '@angular/compiler';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Orders } from 'src/app/shared/interface/orders';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _OrdersService: OrdersService,
    private _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService
  ) {}
  filteredData: any;
  id: string[] = [];
  data: Orders[] = [];
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
            this.data = res;
            console.log(this.data);
          },
        });
      },
    });
  }
}
