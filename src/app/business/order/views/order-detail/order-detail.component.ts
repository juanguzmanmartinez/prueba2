import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OR_CHILDREN_PATH } from '@parameters/router/routing/order/order-router.parameter';
import { OrderDetailImplementService } from './implements/order-detail-implement.service';
import { OrderDetailModel } from './models/order-detail.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  orderId: number;
  orderDetail: OrderDetailModel;
  orderLoading = false;
  errorResponse: HttpErrorResponse;
  timelineData:any;

  constructor(
    private implementsService: OrderDetailImplementService,
    private activatedRoute: ActivatedRoute
  ) {
    this.orderId = this.activatedRoute.snapshot.params[OR_CHILDREN_PATH.orderCode];
  }

  ngOnInit(): void {
    this.implementsService.orderDetail(this.orderId).subscribe({
      next: (response) => {
        this.orderDetail = this.updateResponse(response);
        },
      error: (error) => this.errorResponse = error,
    });
  }

  refreshData(): void {
    this.orderLoading = true;
    this.implementsService.orderDetail(this.orderId)
      .pipe(
        finalize(() => this.orderLoading = false)
      )
      .subscribe({
        next: (response) => (this.orderDetail = this.updateResponse(response)),
      });
  }

  updateResponse(response):OrderDetailModel{
    let timeLine:OrderDetailModel = response.timeline.filter(item => item.status != 'En espera');
            console.log(JSON.stringify(response));
            response.timeline = timeLine;

        return response;
  }
}
