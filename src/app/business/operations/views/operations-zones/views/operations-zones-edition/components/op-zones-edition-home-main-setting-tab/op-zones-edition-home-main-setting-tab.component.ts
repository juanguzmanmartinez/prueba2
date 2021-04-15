import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZoneChannelServiceTypeList, ZoneServiceTypeList } from '../../../../models/operations-zones-service-type.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { CChannelName, EChannel } from '@models/channel/channel.model';
import { sortByPresetOrder } from '@helpers/sort.helper';

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

            const hasDigitalChannel = this.channelTabList.find(channel => channel === EChannel.digital);
            this.channelChange(hasDigitalChannel || this.channelTabList[0]);

        }
    }

    @Input() homeEditionLoader: boolean;

    @Output() edit = new EventEmitter<EDeliveryServiceType>();
    @Output() add = new EventEmitter<{code: EDeliveryServiceType, channel: EChannel}>();

    constructor() {
    }

    ngOnInit(): void {
    }

    channelChange(channel: EChannel) {
        this.channelSelected = channel;
        const zoneChannelServiceTypeList = this.zoneChannelServiceTypeList
            .find((channelServiceTypeList) => channelServiceTypeList.channel === channel);
        this.zoneServiceTypeList = zoneChannelServiceTypeList.serviceTypeList;
    }

    editServiceType(serviceType: EDeliveryServiceType) {
        this.edit.emit(serviceType);
    }

    addServiceType(serviceType: EDeliveryServiceType) {
        this.add.emit({code: serviceType, channel: this.channelSelected});
    }

}
