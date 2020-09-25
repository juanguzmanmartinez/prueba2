import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCapacityAmPmComponent } from './operations-capacity-am-pm.component';

describe('OperationsCapacityAmPmComponent', () => {
  let component: OperationsCapacityAmPmComponent;
  let fixture: ComponentFixture<OperationsCapacityAmPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsCapacityAmPmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsCapacityAmPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
