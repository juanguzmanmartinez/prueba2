import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-op-capacities-local-default-capacity-card',
    templateUrl: './op-capacities-local-default-capacity-card.component.html',
    styleUrls: ['./op-capacities-local-default-capacity-card.component.scss']
})
export class OpCapacitiesLocalDefaultCapacityCardComponent {

    @Input() localCapacityName: string;
    @Input() localCapacityQuantity: number;
    @Input() localCapacityDetail: boolean;
    @Input() localCapacityDisabled: boolean;

    @Output() localCapacityViewMore = new EventEmitter();
    @Output() localCapacityEditService = new EventEmitter();

    constructor() {
    }

    localCapacityViewMoreEmit() {
        this.localCapacityViewMore.emit();
    }

    localCapacityEditServiceEmit() {
        this.localCapacityEditService.emit();
    }
}
