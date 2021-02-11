import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
    store: string;
    name: string;
    brand: Array<'inkafarma' | 'mifarma'>;
    channel: string;
    status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['inkafarma', 'mifarma'], channel: 'Digital', status: 'activo'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['mifarma'], channel: 'Omnicanalidad', status: 'activo'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['inkafarma'], channel: 'Digital', status: 'cerrado'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['inkafarma'], channel: 'Call center', status: 'activo'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['mifarma'], channel: 'Call center', status: 'cerrado'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['inkafarma'], channel: 'Call center', status: 'activo'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['inkafarma'], channel: 'Call center', status: 'activo'},
];

@Component({
    selector: 'app-operations-stores-home',
    templateUrl: './operations-stores-home.component.html',
    styleUrls: ['./operations-stores-home.component.scss']
})
export class OperationsStoresHomeComponent implements AfterViewInit {

    constructor() {
    }


    displayedColumns: string[] = ['store', 'name', 'brand', 'channel', 'status', 'actions'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

}
