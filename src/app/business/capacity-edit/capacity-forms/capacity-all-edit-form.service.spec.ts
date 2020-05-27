import { TestBed } from '@angular/core/testing';

import { CapacityAllEditFormService } from './capacity-all-edit-form.service';

describe('CapacityAllEditFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapacityAllEditFormService = TestBed.get(CapacityAllEditFormService);
    expect(service).toBeTruthy();
  });
});
