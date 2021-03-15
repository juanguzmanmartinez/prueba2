import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '../../../../models/operations-stores.model';

@Component({
    selector: 'app-op-stores-edition-home-store-detail-card',
    templateUrl: './op-stores-edition-home-store-detail-card.component.html',
    styleUrls: ['./op-stores-edition-home-store-detail-card.component.sass']
})
export class OpStoresEditionHomeStoreDetailCardComponent implements OnInit {

    @Input() store: Store;
    @Output() storeEdit = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    editStore() {
        this.storeEdit.emit();
    }

}
