import { Component, Input, OnInit } from '@angular/core';
import { OrderCancelDialogService } from './order-cancel-dialog.service';
import { OrderClientService } from '@clients/order/order-client.service';
import { map } from 'rxjs/operators';
import { SearchOptionsI } from '@atoms/select/select.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderCancelRequest } from './interfaces/order-cancel-request';

@Component({
  selector: 'app-order-cancel-dialog',
  templateUrl: './order-cancel-dialog.component.html',
  styleUrls: ['./order-cancel-dialog.component.sass'],
})
export class OrderCancelDialogComponent implements OnInit {
  @Input() orderId: string;
  optionList:Array<SearchOptionsI> = [];
  public form:FormGroup;
  constructor(private orderCancelDialog:OrderCancelDialogService,
    private orderClient:OrderClientService,
    public fb:FormBuilder) {
      this.form = this.fb.group({
        "reason": new FormControl(null,[Validators.required]),
        "note":new FormControl(''),
      })
    }

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
  onSubmit(){
    if (!this.form.invalid) {
      this.orderClient.cancelOrder({
        statusName: "CANCELLED",
        code:this.form.value.reason,
        orderId:this.orderId,
        customNote:this.form.value.note,
        updatedBy:""
      } as OrderCancelRequest);
    }
  }
}
