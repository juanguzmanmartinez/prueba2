import { Component, Input, OnInit } from '@angular/core';
import { OrderCancelDialogService } from './order-cancel-dialog.service';

@Component({
  selector: 'app-order-cancel-dialog',
  templateUrl: './order-cancel-dialog.component.html',
  styleUrls: ['./order-cancel-dialog.component.sass'],
})
export class OrderCancelDialogComponent implements OnInit {
  @Input() orderId: string;
  optionList = [];
  constructor(private orderCancelDialog:OrderCancelDialogService) { }

  ngOnInit(): void {
  }
  onClose(){
    this.orderCancelDialog.close();
  }
}
