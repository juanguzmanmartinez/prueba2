import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class OperationsDrugstoresEditionActionsStoreService implements OnDestroy {

  private tabSettingSelected = 0;

  get tabSettingSelection(): number {
    return this.tabSettingSelected;
  }

  set tabSettingSelection(selection: number) {
    this.tabSettingSelected = selection;
  }

  constructor() { }

  resetStore(): void {
    this.tabSettingSelection = 0;
  }

  ngOnDestroy(): void {
    this.resetStore();
  }
}
