import { NgModule, ModuleWithProviders } from '@angular/core';
import { CapacityStoreService } from './factories-stores/capacity-store.service';
import { CompanyDrugstoresStoreService } from './factories-stores/company-drugstores-store.service';

@NgModule()
export class BusinessFactoriesModule {

  static forChild(): ModuleWithProviders<BusinessFactoriesModule> {
    return {
      ngModule: BusinessFactoriesModule,
      providers: [
        {
          provide: CompanyDrugstoresStoreService,
          useClass: CompanyDrugstoresStoreService,
        },
        {
          provide: CapacityStoreService,
          useClass: CapacityStoreService,
        }
      ],
    };
  }
}
