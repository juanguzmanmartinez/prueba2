import { Injectable, OnDestroy } from '@angular/core';
import { EChannel } from '@models/channel/channel.model';

@Injectable()
export class OperationsZonesEditionActionsStoreService implements OnDestroy {
    private serviceTypeChannelSelected: EChannel = EChannel.digital;
    private tabSettingSelected = 0;

    constructor() {
    }

    get serviceTypeChannelSelection(): EChannel {
        return this.serviceTypeChannelSelected;
    }

    set serviceTypeChannelSelection(selection: EChannel) {
        this.serviceTypeChannelSelected = selection;
    }

    get tabSettingSelection(): number {
        return this.tabSettingSelected;
    }

    set tabSettingSelection(selection: number) {
        this.tabSettingSelected = selection;
    }

    resetStore() {
        this.serviceTypeChannelSelection = EChannel.digital;
        this.tabSettingSelection = 0;
    }

    ngOnDestroy() {
        this.resetStore();
    }
}
