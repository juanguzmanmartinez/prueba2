import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OR_CHILDREN_PATH } from '@parameters/router/routing/order/order-router.parameter';
import { OrderDetailImplementService } from './implements/order-detail-implement.service';
import { OrderDetailModel } from './models/order-detail.model';
import { finalize } from 'rxjs/operators';
import { OrderCancelDialogService } from '../order-cancel-dialog/order-cancel-dialog.service';
import { OrderHelper } from '@helpers/disable-cancel-order.helper';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

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
  timelineData: any;
  orderHelper = OrderHelper;
  uploadPathAccess:string;
  constructor(
    private implementsService: OrderDetailImplementService,
    private activatedRoute: ActivatedRoute,
    private orderCancelDialog: OrderCancelDialogService
  ) {
    this.orderId =
      this.activatedRoute.snapshot.params[OR_CHILDREN_PATH.orderCode];
      this.uploadPathAccess = `${ROUTER_PATH.orderRecords}`;
  }

  ngOnInit(): void {
    this.implementsService.orderDetail(this.orderId).subscribe({
      next: (response) => {
        this.orderDetail = this.updateResponse(response);
      },
      error: (error) => (this.errorResponse = error),
    });
  }

  refreshData(): void {
    this.orderLoading = true;
    this.implementsService
      .orderDetail(this.orderId)
      .pipe(finalize(() => (this.orderLoading = false)))
      .subscribe({
        next: (response) => (this.orderDetail = this.updateResponse(response)),
      });
  }

  updateResponse(response): OrderDetailModel {
    const timeLine: OrderDetailModel = response.timeline.filter(
      (item) => item.status !== 'En espera'
    );

    response.timeline = timeLine;

    return response;
  }
  cancelOrderModal(){
    this.orderCancelDialog.open(this.orderId.toString()).afterClosed().subscribe((res:boolean)=>{
      if(res) this.refreshData();
    });;
  }
}
