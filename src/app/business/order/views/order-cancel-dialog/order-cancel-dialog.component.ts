import { Component, Input, OnInit } from '@angular/core';
import { OrderCancelDialogService } from './order-cancel-dialog.service';
import { OrderClientService } from '@clients/order/order-client.service';
import { map, finalize, tap, catchError } from 'rxjs/operators';
import { SearchOptionsI } from '@atoms/select/select.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderCancelRequest } from './interfaces/order-cancel-request';
import { Router } from '@angular/router';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { AlertService } from '@molecules/alert/alert.service';
import { throwError } from 'rxjs';

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
    private _alertService: AlertService,
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
      this.orderClient.cancelOrder(({
        action: "CANCELLED",
        origin:"WEB-CALL",
        orderCancelCode:this.form.value.reason,
        orderCancelObservation:this.form.value.note,
      } as OrderCancelRequest),this.orderId).pipe(
        catchError((err)=>{
          this._alertService.alertError("Los sentimos, el pedio no se ha podido cancelar, por favor intenta de nuevo.")
          return throwError(err)}),
        tap(()=>{
          this._alertService.alertSuccess("Pedido cancelado con éxito.")
          this.router.navigate([ROUTER_PATH.orderRecords]);
        }),
        finalize(()=>{
          this.orderCancelDialog.close();
          this.loading = false
        })
      ).subscribe();
    }
  }
}
