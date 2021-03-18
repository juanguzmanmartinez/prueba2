import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    templateUrl: './op-stores-edition-service-type-detail-dialog.component.html',
    styleUrls: ['./op-stores-edition-service-type-detail-dialog.component.sass']
})
export class OpStoresEditionServiceTypeDetailDialogComponent implements OnInit {

    public displayedColumns: string[] = ['scheduled-time'];
    public dataSource = new MatTableDataSource<string>([]);

    @Input() splitSegmentList: string[] = [];

    constructor() {
    }

    ngOnInit(): void {
        this.dataSource.data = this.splitSegmentList;
    }

}
