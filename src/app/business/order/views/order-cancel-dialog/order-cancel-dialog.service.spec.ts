import { TestBed } from '@angular/core/testing';

import { OrderCancelDialogService } from './order-cancel-dialog.service';

describe('OrderCancelDialogService', () => {
  let service: OrderCancelDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderCancelDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
