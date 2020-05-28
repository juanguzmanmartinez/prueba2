import { NgModule, ModuleWithProviders } from '@angular/core';
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
        }
      ],
    };
  }
}
