import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StoreDetail } from '../../../../models/operations-stores.model';
import { CStateName, CStateTag } from '@models/state/state.model';
import { CCompanyName } from '@models/company/company.model';
import { CChannelName } from '@models/channel/channel.model';
import { ETagAppearance } from '@models/tag/tag.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';

@Component({
    selector: 'app-op-stores-edition-home-store-detail-card',
    templateUrl: './op-stores-edition-home-store-detail-card.component.html',
    styleUrls: ['./op-stores-edition-home-store-detail-card.component.sass']
})
export class OpStoresEditionHomeStoreDetailCardComponent implements OnInit {
    public stateTag = CStateTag;
    public stateName = CStateName;
    public companyName = CCompanyName;
    public channelName = CChannelName;
    public tagAppearance = ETagAppearance;

    @Input() storeDetail: StoreDetail;
    @Output() edit = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    get startAndEndHour() {
        const startHour = DatesHelper.date(this.storeDetail.startHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        const endHour = DatesHelper.date(this.storeDetail.endHour, DATES_FORMAT.millisecond)
            .format(DATES_FORMAT.hourMinuteDateTime);
        return `De ${startHour} a ${endHour}`;
    }

    editEvent() {
        this.edit.emit();
    }

}
