import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZoneDetail } from '../../../../models/operations-zones.model';

@Component({
    selector: 'app-op-zones-edition-home-backup-stock-backup-card',
    templateUrl: './op-zones-edition-home-backup-stock-backup-card.component.html',
    styleUrls: ['./op-zones-edition-home-backup-stock-backup-card.component.sass']
})
export class OpZonesEditionHomeBackupStockBackupCardComponent implements OnInit {

    @Input() zoneBackupDetail: ZoneDetail;
    @Input() disabled: boolean;

    @Output() edit = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }


    get stockBackupDisabled() {
        return !this.zoneBackupDetail || this.disabled;
    }

    editEvent() {
        this.edit.emit();
    }
}
