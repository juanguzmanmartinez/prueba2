import { Component, OnInit } from '@angular/core';
import { OrderDetailImplementService } from './implements/order-detail-implement.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDetailModel } from './models/order-detail.model';
import { OR_CHILDREN_PATH } from '@parameters/router/routing/order/order-router.parameter';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderId: number;
  orderDetail: OrderDetailModel;
  errorResponse: HttpErrorResponse;

  constructor(
    private implementsService: OrderDetailImplementService,
    private activatedRoute: ActivatedRoute
  ) {
    this.orderId = this.activatedRoute.snapshot.params[OR_CHILDREN_PATH.orderCode];
  }

  ngOnInit(): void {
    this.implementsService.orderDetail(this.orderId)
      .subscribe({
        next: response => this.orderDetail = response,
        error: error => this.errorResponse = error
      });
  }

}
