import { Component, Input, OnInit } from '@angular/core';
import { IStore } from '../../../../models/operation-stores-responses.model';

@Component({
    selector: 'app-op-stores-home-store-detail-dialog',
    templateUrl: './op-stores-home-store-detail-dialog.component.html',
    styleUrls: ['./op-stores-home-store-detail-dialog.component.sass']
})
export class OpStoresHomeStoreDetailDialogComponent implements OnInit {

    @Input() store: IStore;

    constructor() {
    }

    ngOnInit(): void {
    }

}
