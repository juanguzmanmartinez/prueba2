import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DrugstoreZone } from '../../../../models/operations-drugstores-zone.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PaginatorComponent } from '@atoms/paginator/paginator.component';

type ZoneTable = { zoneCode: string, zoneName: string, backupZone: string, backupAssignedStore: string };

@Component({
    selector: 'app-op-drugstores-edition-home-zones-setting-tab',
    templateUrl: './op-drugstores-edition-home-zones-setting-tab.component.html',
    styleUrls: ['./op-drugstores-edition-home-zones-setting-tab.component.sass']
})
export class OpDrugstoresEditionHomeZonesSettingTabComponent implements AfterViewInit {

    private affiliatedZoneList: DrugstoreZone[];
    public searchInput = '';
    public displayedColumns: string[] = ['zoneCode', 'zoneName', 'backupZone', 'backupAssignedStore', 'actions'];
    public dataSource = new MatTableDataSource<ZoneTable>([]);

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

    private homeZoneSettingTabLoader: boolean;

    @Input('affiliatedZoneList')
    set _affiliatedZoneList(affiliatedZoneList: DrugstoreZone[]) {
        this.affiliatedZoneList = affiliatedZoneList;
        this.settingData();
    }

    @Output() edit = new EventEmitter();

    constructor() {
    }

    ngAfterViewInit(): void {
        this.homeZoneSettingTabLoader = true;
        this.settingData();
    }

    settingData() {
        if (this.affiliatedZoneList?.length && this.homeZoneSettingTabLoader) {
            this.dataSource.data = this.affiliatedZoneList.map((zone): ZoneTable => {
                return {
                    zoneCode: zone.code,
                    zoneName: zone.name,
                    backupZone: zone.backupZone,
                    backupAssignedStore: zone.backupAssignedStore
                };
            });
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator.paginator;
        }
    }

    filterBySearchInput() {
        this.dataSource.filter = this.searchInput.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    editEvent(zoneCode: string) {
        this.edit.emit(zoneCode);
    }
}
