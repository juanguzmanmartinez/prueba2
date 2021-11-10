import { Injectable, OnDestroy } from '@angular/core';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';

@Injectable()
export class OperationsZonesEditionActionsStoreService implements OnDestroy {

  private serviceTypeChannelSelected: EChannel = EChannel.digital;
  private serviceTypeCompanySelected: ECompany = ECompany.inkafarma;
  private tabSettingSelected = 0;

  get serviceTypeChannelSelection(): EChannel {
    return this.serviceTypeChannelSelected;
  }

  set serviceTypeChannelSelection(selection: EChannel) {
    this.serviceTypeChannelSelected = selection;
  }

  set serviceTypeCompanySelection(selection: ECompany) {
    this.serviceTypeCompanySelected = selection;
  }

  get tabSettingSelection(): number {
    return this.tabSettingSelected;
  }

  set tabSettingSelection(selection: number) {
    this.tabSettingSelected = selection;
  }

  constructor() { }

  resetStore(): void {
    this.serviceTypeChannelSelection = EChannel.digital;
    this.tabSettingSelection = 0;
  }

  ngOnDestroy(): void {
    this.resetStore();
  }
}
