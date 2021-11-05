import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CDeliveryServiceTypeName, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { CStateValue } from '@models/state/state.model';
import { ZoneServiceTypeRegistered } from '../../../../models/operations-zones-service-type.model';
import { CChannelColor, CChannelName } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { minuteFormat } from '@helpers/date-name.helper';
import { CCompanyColor, CCompanyIcon, CCompanyName, ECompany } from '@models/company/company.model';

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
    private companyName= CCompanyName;
    private companyColor = CCompanyColor;
    public companyIcon = CCompanyIcon;
    public tagAppearance = ETagAppearance;

    @Input() serviceType: ZoneServiceTypeRegistered;
    @Input() company: ECompany;
    @Output() edit = new EventEmitter<EDeliveryServiceType>();
    @Output() add = new EventEmitter<EDeliveryServiceType>();
    constructor() {
    }

    ngOnInit(): void {
    }

    get serviceTypeDisabled() {
        return !this.serviceType.serviceType || !this.stateValue[this.serviceType.serviceType.state];
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

    get segmentCompanyName() {

      return this.companyName[this.company];
    }
    get segmentCompanyIcon() {
      return this.companyIcon[this.company];
    }
    get segmentCompanyColor() {
      return this.serviceTypeDisabled ? 'gray-3' : this.companyColor[this.company];
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
            return minuteFormat(this.serviceType.serviceType.segmentGap);
        }
        return 'No habilitado';
    }

    get serviceTypePath() {
      this.serviceType.company=this.company;
        return ROUTER_PATH.opZones_ZoneServiceTypeEdition();
    }

    editEvent() {
        this.edit.emit(this.serviceType.code);
    }

    addEvent() {
        this.add.emit(this.serviceType.code);
    }
}
