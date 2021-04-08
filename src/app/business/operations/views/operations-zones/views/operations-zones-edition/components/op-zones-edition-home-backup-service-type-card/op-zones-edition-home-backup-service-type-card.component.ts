import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZoneBackupServiceTypeRegistered } from '../../../../models/operations-zones-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CStateName } from '@models/state/state.model';

@Component({
    selector: 'app-op-zones-edition-home-backup-service-type-card',
    templateUrl: './op-zones-edition-home-backup-service-type-card.component.html',
    styleUrls: ['./op-zones-edition-home-backup-service-type-card.component.sass']
})
export class OpZonesEditionHomeBackupServiceTypeCardComponent implements OnInit {
    private serviceTypeName = CDeliveryServiceTypeName;
    private stateName = CStateName;

    @Input() zoneBackupDetail: ZoneDetail;
    @Input() serviceType: ZoneBackupServiceTypeRegistered;
    @Input() disabled: boolean;

    @Output() edit = new EventEmitter<EDeliveryServiceType>();
    @Output() add = new EventEmitter<EDeliveryServiceType>();

    constructor() {
    }

    ngOnInit(): void {
    }

    get serviceTypeDisabled() {
        return !this.zoneBackupDetail || !this.serviceType.serviceType || this.disabled;
    }

    get segmentName() {
        return this.serviceTypeName[this.serviceType.code];
    }

    get startAndEndHour() {
        if (this.serviceTypeDisabled) {
            const startHour = DatesHelper.date(this.serviceType.serviceType.startHour, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinuteDateTime);
            const endHour = DatesHelper.date(this.serviceType.serviceType.endHour, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinuteDateTime);
            return `${startHour} - ${endHour}`;
        }
        return 'No habilitado';
    }

    get segmentGap() {
        if (this.serviceTypeDisabled) {
            const plural = this.serviceType.serviceType.segmentGap > 1;
            return `${this.serviceType.serviceType.segmentGap} minuto${plural ? 's' : ''}`;
        }
        return 'No habilitado';
    }

    get forceServiceType() {
        if (this.serviceTypeDisabled) {
            return this.stateName[this.serviceType.serviceType.forceService]();
        }
        return 'No habilitado';
    }


    editEvent() {
        this.edit.emit(this.serviceType.code);
    }

    addEvent() {
        this.add.emit(this.serviceType.code);
    }
}
