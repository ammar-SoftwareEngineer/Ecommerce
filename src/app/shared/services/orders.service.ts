import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _HttpClient: HttpClient) {}

  checkOut(id: string | null, orderInfo: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      { shippingAddress: orderInfo }
    );
  }
  getAllOrders(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders`
    );
  }
  getUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }
}
