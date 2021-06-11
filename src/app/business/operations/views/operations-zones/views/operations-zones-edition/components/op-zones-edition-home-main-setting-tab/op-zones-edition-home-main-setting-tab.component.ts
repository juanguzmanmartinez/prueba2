import { Component, EventEmitter, Input, OnInit, Output, SkipSelf } from '@angular/core';
import { ZoneChannelServiceTypeList, ZoneServiceTypeList } from '../../../../models/operations-zones-service-type.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { CChannelName, EChannel } from '@models/channel/channel.model';
import { sortByPresetOrder } from '@helpers/sort.helper';
import { ZoneServiceTypeBasicRequest } from '../../../../parameters/operations-zones-service-type.parameter';
import { OperationsZonesEditionActionsStoreService } from '../../stores/operations-zones-edition-actions-store.service';

const ChannelTabListPriority = [EChannel.digital, EChannel.call, EChannel.omnichannel];

@Component({
    selector: 'app-op-zones-edition-home-main-setting-tab',
    templateUrl: './op-zones-edition-home-main-setting-tab.component.html',
    styleUrls: ['./op-zones-edition-home-main-setting-tab.component.sass']
})
export class OpZonesEditionHomeMainSettingTabComponent implements OnInit {
    public channelName = CChannelName;
    public channelTabList: EChannel[];
    public channelSelected: EChannel;
    public zoneServiceTypeList: ZoneServiceTypeList;
    public zoneChannelServiceTypeList: ZoneChannelServiceTypeList[];

    @Input('zoneChannelServiceTypeList')
    set _zoneChannelServiceTypeList(zoneChannelServiceTypeList: ZoneChannelServiceTypeList[]) {
        if (zoneChannelServiceTypeList) {
            this.zoneChannelServiceTypeList = zoneChannelServiceTypeList;
            const channelTabList = zoneChannelServiceTypeList
                .map((zoneChannelServiceType) => zoneChannelServiceType.channel);
            this.channelTabList = sortByPresetOrder(channelTabList, ChannelTabListPriority);
            const savedChannel = this._operationsZonesEditionActionsStore.serviceTypeChannelSelection || EChannel.digital;
            const hasDigitalChannel = this.channelTabList.find(channel => channel === savedChannel);
            this.channelChange(hasDigitalChannel || this.channelTabList[0]);

        }
    }

    @Input() homeEditionLoader: boolean;

    @Output() edit = new EventEmitter<ZoneServiceTypeBasicRequest>();
    @Output() add = new EventEmitter<ZoneServiceTypeBasicRequest>();

    constructor(
        @SkipSelf() private _operationsZonesEditionActionsStore: OperationsZonesEditionActionsStoreService,
    ) {
    }

    ngOnInit(): void {
    }

    channelChange(channel: EChannel) {
        this.channelSelected = channel;
        const zoneChannelServiceTypeList = this.zoneChannelServiceTypeList
            .find((channelServiceTypeList) => channelServiceTypeList.channel === channel);
        this.zoneServiceTypeList = zoneChannelServiceTypeList.serviceTypeList;
        this._operationsZonesEditionActionsStore.serviceTypeChannelSelection = channel;
    }

    editServiceType(serviceType: EDeliveryServiceType) {
        this.edit.emit({code: serviceType, channel: this.channelSelected});
    }

    addServiceType(serviceType: EDeliveryServiceType) {
        this.add.emit({code: serviceType, channel: this.channelSelected});
    }

}
