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
import { UserStoreService } from '@stores/user-store.service';

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
  public canceledFlag = false;
  constructor(private orderCancelDialog:OrderCancelDialogService,
    private orderClient:OrderClientService,
    private _alertService: AlertService,
    private router:Router,
    private userStore:UserStoreService,
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
        code: r.code,
        desc:r.description
      } as SearchOptionsI })),
      catchError((err)=>{
        this.orderCancelDialog.close(false);
        this._alertService.alertError("Lo sentimos, ocurrió un error, por favor intenta de nuevo.")
        return throwError(err)}),
    )
    .subscribe(
      (list:Array<any>) =>this.optionList = list)
  }
  onSubmit(){
    if (!this.form.invalid) {
      this.loading = true;
      this.orderClient.cancelOrder(({
        action: "CANCEL_ORDER",
        origin:"OMS",
        orderCancelCode:this.form.value.reason,
        orderCancelObservation:this.form.value.note,
        updatedBy:this.userStore?.currentUser?.id
      } as OrderCancelRequest),this.orderId).pipe(
        catchError((err)=>{
          this.canceledFlag = false;
          this._alertService.alertError("Lo sentimos, el pedido no se ha podido cancelar, por favor intenta de nuevo.")
          return throwError(err)}),
        tap((res)=>{
          if (res?.orderStatus?.successful) {
            this.canceledFlag = true;
            this._alertService.alertSuccess("Pedido cancelado con éxito.");
          }
          else{
            this.canceledFlag = false;
            this._alertService.alertError("Lo sentimos, el pedido no se ha podido cancelar, por favor intenta de nuevo.")
          }
        }),
        finalize(()=>{
          this.orderCancelDialog.close(this.canceledFlag);
          this.loading = false
        })
      ).subscribe();
    }
  }
}
