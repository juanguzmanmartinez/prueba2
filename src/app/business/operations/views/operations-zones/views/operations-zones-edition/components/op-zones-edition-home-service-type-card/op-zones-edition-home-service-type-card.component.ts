import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-op-zones-edition-home-service-type-card',
    templateUrl: './op-zones-edition-home-service-type-card.component.html',
    styleUrls: ['./op-zones-edition-home-service-type-card.component.sass']
})
export class OpZonesEditionHomeServiceTypeCardComponent implements OnInit {
    @Input() serviceTypeName: string;

    @Output() edit = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    editEvent() {
        this.edit.emit();
    }
}
