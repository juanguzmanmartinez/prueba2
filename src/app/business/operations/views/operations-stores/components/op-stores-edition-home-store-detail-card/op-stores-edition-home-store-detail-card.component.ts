import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStore } from '../../modals/operation-stores-responses.modal';

@Component({
    selector: 'app-op-stores-edition-home-store-detail-card',
    templateUrl: './op-stores-edition-home-store-detail-card.component.html',
    styleUrls: ['./op-stores-edition-home-store-detail-card.component.sass']
})
export class OpStoresEditionHomeStoreDetailCardComponent implements OnInit {

    @Input() store: IStore;
    @Output() storeEdit = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    editStore() {
        this.storeEdit.emit();
    }

}
