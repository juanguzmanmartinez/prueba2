import { Component, Input, OnInit } from '@angular/core';
import { OrderCancelDialogService } from './order-cancel-dialog.service';
import { OrderClientService } from '@clients/order/order-client.service';
import { map, finalize, tap } from 'rxjs/operators';
import { SearchOptionsI } from '@atoms/select/select.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderCancelRequest } from './interfaces/order-cancel-request';
import { Router } from '@angular/router';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-order-cancel-dialog',
  templateUrl: './order-cancel-dialog.component.html',
  styleUrls: ['./order-cancel-dialog.component.sass'],
})
export class OrderCancelDialogComponent implements OnInit {
  @Input() orderId: string;
  optionList:Array<SearchOptionsI> = [];
  public form:FormGroup;
  public loading:boolean;
  constructor(private orderCancelDialog:OrderCancelDialogService,
    private orderClient:OrderClientService,
    private router:Router,
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
      this.loading = true;
      this.orderClient.cancelOrder({
        statusName: "CANCELLED",
        code:this.form.value.reason,
        orderId:this.orderId,
        customNote:this.form.value.note,
        updatedBy:""
      } as OrderCancelRequest).pipe(
        tap(()=>{
          this.orderCancelDialog.close();
          this.router.navigate([ROUTER_PATH.orderRecords]);
        }),
        finalize(()=>this.loading = false)
      ).subscribe();
    }
  }
}
