import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCapacitiesStepEditionModeComponent } from './operations-capacities-step-edition-mode.component';

describe('OperationsCapacitiesStepEditionModeComponent', () => {
  let component: OperationsCapacitiesStepEditionModeComponent;
  let fixture: ComponentFixture<OperationsCapacitiesStepEditionModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsCapacitiesStepEditionModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsCapacitiesStepEditionModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
