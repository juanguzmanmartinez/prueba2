import { Component, Input, OnInit } from '@angular/core';
import { IStore } from '../../modals/operation-stores-responses.modal';

@Component({
    selector: 'app-op-stores-store-detail-dialog',
    templateUrl: './op-stores-store-detail-dialog.component.html',
    styleUrls: ['./op-stores-store-detail-dialog.component.sass']
})
export class OpStoresStoreDetailDialogComponent implements OnInit {

    @Input() store: IStore;

    constructor() {
    }

    ngOnInit(): void {
    }

}
