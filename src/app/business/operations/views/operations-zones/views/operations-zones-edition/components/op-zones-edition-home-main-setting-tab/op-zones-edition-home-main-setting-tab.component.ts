import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SkipSelf,
} from '@angular/core';
import {
  ZoneChannelServiceTypeList,
  ZoneCompanyServiceTypeList,
  ZoneServiceType,
  ZoneServiceTypeList,
  ZoneServiceTypeRegistered,
} from '../../../../models/operations-zones-service-type.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { CChannelName, EChannel } from '@models/channel/channel.model';
import { sortByPresetOrder } from '@helpers/sort.helper';
import { ZoneServiceTypeBasicRequest } from '../../../../parameters/operations-zones-service-type.parameter';
import { OperationsZonesEditionActionsStoreService } from '../../stores/operations-zones-edition-actions-store.service';
import { CCompanyName, ECompany } from '@models/company/company.model';
import { ZoneDetail } from '../../../../models/operations-zones.model';

const ChannelTabListPriority = [
  EChannel.digital,
  EChannel.call,
  EChannel.omnichannel,
];
const CompanyTabListPriority = [
  ECompany.inkafarma,
  ECompany.mifarma,
  ECompany.todos,
];
const listChannels = [
  { code: 'CALL', name: 'Call Center' },
  { code: 'DIGITAL', name: 'Digital' },
];

const listCompanies = [
  { code: 'IKF', name: 'Inkafarma' },
  { code: 'MF', name: 'Mifarma' },
];

@Component({
  selector: 'app-op-zones-edition-home-main-setting-tab',
  templateUrl: './op-zones-edition-home-main-setting-tab.component.html',
  styleUrls: ['./op-zones-edition-home-main-setting-tab.component.sass'],
})
export class OpZonesEditionHomeMainSettingTabComponent
  implements OnInit, OnDestroy
{
  public channelName = CChannelName;
  public companyName = CCompanyName;
  public channelTabList: EChannel[];
  public channelSelected: EChannel;
  public companiesSelected: ECompany;
  public zoneServiceTypeList: ZoneServiceTypeList;
  public zoneChannelServiceTypeList: ZoneChannelServiceTypeList[];
  public zoneCompanyServiceTypeList: ZoneCompanyServiceTypeList[];
  public companyItem: ECompany;
  public companyTabList: ECompany[];
  public serviceList: ZoneServiceType[];

  @Input('zoneChannelServiceTypeList')
  set _zoneChannelServiceTypeList(
    zoneChannelServiceTypeList: ZoneChannelServiceTypeList[]
  ) {
    if (zoneChannelServiceTypeList) {
      this.zoneChannelServiceTypeList = zoneChannelServiceTypeList;
      const channelTabList = zoneChannelServiceTypeList.map(
        (zoneChannelServiceType) => zoneChannelServiceType.channel
      );
      this.channelTabList = sortByPresetOrder(
        channelTabList,
        ChannelTabListPriority
      );

      const savedChannel =
        this._operationsZonesEditionActionsStore.serviceTypeChannelSelection ||
        EChannel.digital;
      const hasDigitalChannel = this.channelTabList.find(
        (channel) => channel === savedChannel
      );
      this.channelList(hasDigitalChannel || this.channelTabList[0]);
      //
      // this.zoneServiceTypeList = zoneChannelServiceTypeList.serviceTypeList;
      //

      const companyTabList = zoneChannelServiceTypeList.map(
        (zoneChannelServiceType) => zoneChannelServiceType.company
      );

      this.companyTabList = companyTabList[0];
      this.companyItem = this.companyTabList[0];
    }
  }

  @Input('zoneCompanyServiceTypeList')
  set _zoneCompanyServiceTypeList(
    zoneCompanyServiceTypeList: ZoneCompanyServiceTypeList[]
  ) {
    if (zoneCompanyServiceTypeList) {
      this.zoneCompanyServiceTypeList = zoneCompanyServiceTypeList;
      const companyTabList = zoneCompanyServiceTypeList.map(
        (value) => value.company
      );
      this.companyTabList = sortByPresetOrder(
        companyTabList,
        CompanyTabListPriority
      );
    }
  }

  @Input() homeEditionLoader: boolean;
  @Input() zoneDetail: ZoneDetail;
  @Input() serviceTypeList: ZoneServiceType[];
  @Input() zonesServiceTypeRegistered: ZoneServiceTypeRegistered[];

  @Output() edit = new EventEmitter<ZoneServiceTypeBasicRequest>();
  @Output() add = new EventEmitter<ZoneServiceTypeBasicRequest>();

  constructor(
    @SkipSelf()
    private _operationsZonesEditionActionsStore: OperationsZonesEditionActionsStoreService
  ) {}

  ngOnInit(): void {}

  companyChange(companies: ECompany): void {
    this.companiesSelected = companies;
  }

  channelList(channel: EChannel): void {
    // this.channelSelected = channel;
    const zoneChannelServiceTypeList = this.zoneChannelServiceTypeList.find(
      (channelServiceTypeList) => channelServiceTypeList.channel === channel
    );
    this.zoneServiceTypeList = zoneChannelServiceTypeList.serviceTypeList;
    this._operationsZonesEditionActionsStore.serviceTypeChannelSelection =
      channel;
  }

  channelChange(channel: EChannel): void {
    this.channelSelected = channel;
    // const zoneChannelServiceTypeList = this.zoneChannelServiceTypeList.find(
    //   (channelServiceTypeList) => channelServiceTypeList.channel === channel
    // );
    // this.zoneServiceTypeList = zoneChannelServiceTypeList.serviceTypeList;

    this._operationsZonesEditionActionsStore.serviceTypeChannelSelection =
      channel;
  }

  editServiceType(serviceType: ZoneServiceType): void {
    this.edit.emit({
      code: serviceType.code,
      channel: serviceType.channel,
      company: serviceType.companyCode,
    });
  }

  addServiceType(serviceType: EDeliveryServiceType): void {
    this.add.emit({
      code: serviceType,
      channel: this.channelSelected,
      company: this.companyItem,
    });
  }

  ngOnDestroy(): void {
    this.zonesServiceTypeRegistered = [];
  }
}
