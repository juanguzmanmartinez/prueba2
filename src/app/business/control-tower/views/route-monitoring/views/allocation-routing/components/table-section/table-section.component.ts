import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IOrder } from '../../../../interfaces/order.interface';
import {
  ColumnNameList,
  OrderManualDB,
  OrderPendingDB,
} from '../../../../constants/orders.constant';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
})
export class TableSectionComponent implements OnInit {
  public dataSource = new MatTableDataSource<IOrder>();
  public dataSourceOrderPending = new MatTableDataSource<IOrder>();
  public selection = new SelectionModel(true, []);
  public selectionOrderPending = new SelectionModel(true, []);

  @Output() eventEmitter = new EventEmitter();

  get selected(): number {
    return this.selection.selected.length;
  }

  public displayedColumns: string[] = [
    ColumnNameList.select,
    ColumnNameList.orderId,
    ColumnNameList.local,
    ColumnNameList.address,
    ColumnNameList.channel,
    ColumnNameList.service,
    ColumnNameList.promiseDate,
    ColumnNameList.detail,
    ColumnNameList.actions,
  ];

  ngOnInit(): void {
    this.dataSource.data = OrderManualDB;
    this.dataSourceOrderPending.data = OrderPendingDB;
  }

  isAllSelected(): boolean {
    return this.dataSource.data.length === this.selection.selected.length;
  }

  isAllOrderPendingSelected(): boolean {
    return (
      this.dataSourceOrderPending.data.length ===
      this.selectionOrderPending.selected.length
    );
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  masterToggleOrderPending(): void {
    this.isAllOrderPendingSelected()
      ? this.selectionOrderPending.clear()
      : this.dataSourceOrderPending.data.forEach((row) =>
          this.selectionOrderPending.select(row)
        );
  }
}
