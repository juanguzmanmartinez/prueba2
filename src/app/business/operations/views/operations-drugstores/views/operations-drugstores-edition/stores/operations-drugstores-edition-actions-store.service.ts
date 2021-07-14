import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class OperationsDrugstoresEditionActionsStoreService implements OnDestroy {
    private tabSettingSelected = 0;

    constructor() {
    }

    get tabSettingSelection(): number {
        return this.tabSettingSelected;
    }

    set tabSettingSelection(selection: number) {
        this.tabSettingSelected = selection;
    }

    resetStore() {
        this.tabSettingSelection = 0;
    }

    ngOnDestroy() {
        this.resetStore();
    }
}
