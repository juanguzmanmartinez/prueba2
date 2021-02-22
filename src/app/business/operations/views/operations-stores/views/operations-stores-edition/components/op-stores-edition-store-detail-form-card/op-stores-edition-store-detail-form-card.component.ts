import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-op-stores-edition-store-detail-form-card',
    templateUrl: './op-stores-edition-store-detail-form-card.component.html',
    styleUrls: ['./op-stores-edition-store-detail-form-card.component.sass']
})
export class OpStoresEditionStoreDetailFormCardComponent implements OnInit {

    @Output() cancelStoreEdition = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    cancelStoreEditionEvent() {
        this.cancelStoreEdition.emit();
    }
}
