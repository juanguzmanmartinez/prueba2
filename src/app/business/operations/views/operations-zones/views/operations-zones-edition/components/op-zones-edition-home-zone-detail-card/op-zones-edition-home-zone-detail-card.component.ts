import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Zone } from '../../../../modals/operation-zones-responses.modal';

@Component({
    selector: 'app-op-zones-edition-home-zone-detail-card',
    templateUrl: './op-zones-edition-home-zone-detail-card.component.html',
    styleUrls: ['./op-zones-edition-home-zone-detail-card.component.sass']
})
export class OpZonesEditionHomeZoneDetailCardComponent implements OnInit {
    @Input() zone: Zone;
    @Output() edit = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }


    editEvent() {
        this.edit.emit();
    }
}
