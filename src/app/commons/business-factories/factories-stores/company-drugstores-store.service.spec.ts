import { TestBed } from '@angular/core/testing';

import { CompanyDrugstoresStoreService } from './company-drugstores-store.service';

describe('CompanyDrugstoresStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyDrugstoresStoreService = TestBed.get(CompanyDrugstoresStoreService);
    expect(service).toBeTruthy();
  });
});
