import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-op-stores-edition-home-service-type-card',
    templateUrl: './op-stores-edition-home-service-type-card.component.html',
    styleUrls: ['./op-stores-edition-home-service-type-card.component.sass']
})
export class OpStoresEditionHomeServiceTypeCardComponent implements OnInit {

    @Input() serviceTypeName: string;

    @Output() storeEditService = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    editService() {
        this.storeEditService.emit();
    }

}
