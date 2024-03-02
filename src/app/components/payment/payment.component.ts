import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OrdersService } from 'src/app/shared/services/orders.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _OrdersService: OrdersService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  msgError: string = '';
  isLoading: boolean = false;
  cartId: string | null = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      },
    });
  }

  checkOut: FormGroup = this._FormBuilder.group({
    details: ['', [Validators.required]],
    city: ['', [Validators.required]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
  });

  handlCheckOut(): void {
    if (this.checkOut.valid) {
      this.isLoading = true;
      this._OrdersService.checkOut(this.cartId, this.checkOut.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.status == 'success') {
            window.open(response.session.url);
          }
          console.log(response);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
}
