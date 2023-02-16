import { Component, Input, OnInit } from '@angular/core';
import { OrderCancelDialogService } from './order-cancel-dialog.service';
import { OrderClientService } from '@clients/order/order-client.service';
import { catchError, map } from 'rxjs/operators';
import { OrderReasonCancelModel } from './models/OrderReasonCancelModel';
import { SearchOptionsI } from '@atoms/select/select.component';

@Component({
  selector: 'app-order-cancel-dialog',
  templateUrl: './order-cancel-dialog.component.html',
  styleUrls: ['./order-cancel-dialog.component.sass'],
})
export class OrderCancelDialogComponent implements OnInit {
  @Input() orderId: string;
  optionList:Array<SearchOptionsI> = [];
  constructor(private orderCancelDialog:OrderCancelDialogService,
    private orderClient:OrderClientService) { }

  ngOnInit(): void {
    this.getListReason();
  }
  onClose(){
    this.orderCancelDialog.close();
  }

  getListReason(){
    this.orderClient.getOptionListReason()
    .pipe(
      map(list=>list.map(r=>{return {
        code: r.id,
        desc:r.reason
      } as SearchOptionsI }))
    )
    .subscribe(
      (list:Array<any>) =>this.optionList = list)
  }
}
