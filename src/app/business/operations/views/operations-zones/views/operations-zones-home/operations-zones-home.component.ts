import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { IZone, ZONES_LIST } from '../../modals/operation-zones-responses.modal';
import { OpZonesHomeZoneDetailDialogService } from './components/op-zones-home-zone-detail-dialog/op-zones-home-zone-detail-dialog.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CDeliveryServiceTypeName } from '@models/capacities/capacities-service-type.model';

@Component({
  selector: 'app-operations-zones-home',
  templateUrl: './operations-zones-home.component.html',
  styleUrls: ['./operations-zones-home.component.sass'],
  providers: [OpZonesHomeZoneDetailDialogService]
})
export class OperationsZonesHomeComponent implements AfterViewInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public serviceTypeName = CDeliveryServiceTypeName;

  constructor(
      private _storeDetailDialog: OpZonesHomeZoneDetailDialogService,
      private _router: Router,
  ) {
  }

  displayedColumns: string[] = ['selector', 'zoneCode', 'zoneName', 'assignedStore', 'serviceType', 'zoneState', 'actions'];
  dataSource = new MatTableDataSource(ZONES_LIST);
  rowSelection = new SelectionModel<IZone>(true, []);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.rowSelection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.rowSelection.clear() :
        this.dataSource.data.forEach(row => this.rowSelection.select(row));
  }




  editRow(zoneId: string) {
    this._router.navigate([CONCAT_PATH.opZones_ZoneId(zoneId)]);
  }
  rowDetailDialog(store: IZone) {
    const subscription = this._storeDetailDialog.openHomeZoneDetailDialog(store)
        .afterClosed()
        .subscribe((editService) => {
          if (editService) {
            this.editRow(store.code);
          }
        });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
