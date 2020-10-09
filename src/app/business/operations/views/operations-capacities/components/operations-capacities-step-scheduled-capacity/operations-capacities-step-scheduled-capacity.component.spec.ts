import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCapacitiesStepScheduledCapacityComponent } from './operations-capacities-step-scheduled-capacity.component';

describe('OperationsCapacitiesStepScheduledCapacityComponent', () => {
  let component: OperationsCapacitiesStepScheduledCapacityComponent;
  let fixture: ComponentFixture<OperationsCapacitiesStepScheduledCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsCapacitiesStepScheduledCapacityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsCapacitiesStepScheduledCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
