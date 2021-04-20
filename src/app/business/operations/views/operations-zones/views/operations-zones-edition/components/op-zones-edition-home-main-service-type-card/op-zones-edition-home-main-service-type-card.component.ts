import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CDeliveryServiceTypeName, CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CStateValue } from '@models/state/state.model';
import { ZoneServiceTypeRegistered } from '../../../../models/operations-zones-service-type.model';
import { CChannelColor, CChannelName } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
    selector: 'app-op-zones-edition-home-main-service-type-card',
    templateUrl: './op-zones-edition-home-main-service-type-card.component.html',
    styleUrls: ['./op-zones-edition-home-main-service-type-card.component.sass']
})
export class OpZonesEditionHomeMainServiceTypeCardComponent implements OnInit {
    private serviceTypeName = CDeliveryServiceTypeName;
    private stateValue = CStateValue;
    private channelName = CChannelName;
    private channelColor = CChannelColor;
    public tagAppearance = ETagAppearance;

    @Input() serviceType: ZoneServiceTypeRegistered;
    @Output() edit = new EventEmitter<EDeliveryServiceType>();
    @Output() add = new EventEmitter<EDeliveryServiceType>();

    constructor() {
    }

    ngOnInit(): void {
    }

    get serviceTypeDisabled() {
        return !this.serviceType.serviceType || !this.stateValue[this.serviceType.serviceType.state] || !this.serviceType.available;
    }

    get segmentName() {
        return this.serviceTypeName[this.serviceType.code];
    }

    get segmentChannelName() {
        return this.channelName[this.serviceType.channel];
    }

    get segmentChannelColor() {
        return this.serviceTypeDisabled ? 'gray-3' : this.channelColor[this.serviceType.channel];
    }

    get startAndEndHour() {
        if (this.serviceType.serviceType) {
            const startHour = DatesHelper.date(this.serviceType.serviceType.startHour, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinuteDateTime);
            const endHour = DatesHelper.date(this.serviceType.serviceType.endHour, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinuteDateTime);
            return `${startHour} - ${endHour}`;
        }
        return 'No habilitado';
    }

    get segmentGap() {
        if (this.serviceType.serviceType) {
            const plural = this.serviceType.serviceType.segmentGap > 1;
            return `${this.serviceType.serviceType.segmentGap} minuto${plural ? 's' : ''}`;
        }
        return 'No habilitado';
    }

    get serviceTypePath() {
        const zoneCodePath = ROUTER_PATH.opZones_Zone('?');
        return `${zoneCodePath}/${CDeliveryServiceTypeRoute[this.serviceType.code]}`;
    }

    editEvent() {
        this.edit.emit(this.serviceType.code);
    }

    addEvent() {
        this.add.emit(this.serviceType.code);
    }
}
