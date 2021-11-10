import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Zone } from '../../models/operations-zones.model';
import { OpZonesHomeZoneDetailDialogService } from './components/op-zones-home-zone-detail-dialog/op-zones-home-zone-detail-dialog.service';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { OperationsZonesImplementService } from '../../implements/operations-zones-implement.service';
import { PaginatorComponent } from '@atoms/paginator/paginator.component';
import { normalizeValue } from '@helpers/string.helper';
import { CStateName, CStateTag } from '@models/state/state.model';
import { CChannelName } from '@models/channel/channel.model';
import { SortAlphanumeric, SortString } from '@helpers/sort.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { CCompanyIcon, CCompanyName } from '@models/company/company.model';

const ColumnNameList = {
  zoneCode: 'zoneCode',
  zoneName: 'zoneName',
  assignedStore: 'assignedStore',
  zoneCompany: 'zoneCompany',
  zoneChannel: 'zoneChannel',
  zoneState: 'zoneState',
  actions: 'actions',
};

@Component({
  selector: 'app-operations-zones-home',
  templateUrl: './operations-zones-home.component.html',
  styleUrls: ['./operations-zones-home.component.sass'],
  providers: [OpZonesHomeZoneDetailDialogService]
})
export class OperationsZonesHomeComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  public serviceTypeName = CDeliveryServiceTypeName;
  public companyName = CCompanyName;
  public companyIcon = CCompanyIcon;
  public channelName = CChannelName;
  public stateTag = CStateTag;
  public stateName = CStateName;

  public searchInput = '';
  public tableLoader = true;
  public errorResponse: HttpErrorResponse;

  public displayedColumns: string[] = [
    ColumnNameList.zoneCode, ColumnNameList.zoneName,
    ColumnNameList.assignedStore, ColumnNameList.zoneCompany,
    ColumnNameList.zoneChannel, ColumnNameList.zoneState, ColumnNameList.actions];
  public dataSource = new MatTableDataSource([]);

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _router: Router,
    private _zoneDetailDialog: OpZonesHomeZoneDetailDialogService,
    private _operationsZonesImplement: OperationsZonesImplementService,
  ) { }

  ngOnInit(): void {
    this._operationsZonesImplement.zoneList
      .subscribe((zoneList: Zone[]) => {
          this.tableLoader = false;
          this.dataSource.data = zoneList;
          this.setDataSourceService();
        },
        (error) => {
          this.tableLoader = false;
          this.errorResponse = error;
        });
  }

  setDataSourceService(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.filterPredicate = (data: Zone, filter: string) => {
      const filterNormalize = normalizeValue(filter);
      const idNormalize = normalizeValue(data.code);
      const nameNormalize = normalizeValue(data.name);
      const assignedStoreNameNormalize = normalizeValue(data.assignedStore ? data.assignedStore.name : '');
      const assignedStoreCodeNormalize = normalizeValue(data.assignedStoreCode);
      const companyNormalize = normalizeValue(data.companyList.map(company => this.companyName[company]).join(''));

      const channelNormalize = normalizeValue(data.channelList.map(channel => this.channelName[channel]).join(''));
      const stateNormalize = normalizeValue(this.stateName[data.state]());
      const valueArray = [idNormalize, nameNormalize, assignedStoreCodeNormalize, assignedStoreNameNormalize, companyNormalize, channelNormalize, stateNormalize];

      const concatValue = normalizeValue(valueArray.join(''));
      const everyValue = valueArray.some(value => value.includes(filterNormalize));

      return concatValue.includes(filterNormalize) && everyValue;
    };

    this.dataSource.sortData = (data: Zone[], sort: MatSort) => {
      return data.sort((a: Zone, b: Zone) => {
        switch (sort.active) {
          case ColumnNameList.zoneCode:
            return SortAlphanumeric(a.code, b.code, sort.direction);
          case ColumnNameList.zoneName:
            return SortAlphanumeric(a.name, b.name, sort.direction);
          case ColumnNameList.assignedStore:
            const assignedStoreNameA = a.assignedStore ? a.assignedStore.name : '';
            const assignedStoreNameB = b.assignedStore ? b.assignedStore.name : '';
            return SortAlphanumeric(assignedStoreNameA, assignedStoreNameB, sort.direction);
          case ColumnNameList.zoneCompany:
            const companyListNameA = a.companyList
              .map(company => this.companyName[company]).join('');
            const companyListNameB = b.companyList
              .map(company => this.companyName[company]).join('');
            return SortString(companyListNameA, companyListNameB, sort.direction);
          case ColumnNameList.zoneChannel:
            const channelListNameA = a.channelList
              .map(channel => this.channelName[channel]).join('');
            const channelListNameB = b.channelList
              .map(channel => this.channelName[channel]).join('');
            return SortString(channelListNameA, channelListNameB, sort.direction);
          case ColumnNameList.zoneState:
            const stateNameA = this.stateName[a.state]();
            const stateNameB = this.stateName[b.state]();
            return SortString(stateNameA, stateNameB, sort.direction);
          default:
            const defaultA = a[sort.active];
            const defaultB = b[sort.active];
            return SortAlphanumeric(defaultA, defaultB, sort.direction);
        }
      });
    };
  }


  filterBySearchInput(): void {
    this.dataSource.filter = this.searchInput.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRow(zoneId: string): void {
    this._router.navigate([ROUTER_PATH.opZones_Zone(zoneId)]);
  }

  rowDetailDialog(zone: Zone): void {
    const subscription = this._zoneDetailDialog.open(zone)
      .afterClosed()
      .subscribe((edition) => {
        if (edition) {
          this.editRow(zone.id);
        }
      });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
