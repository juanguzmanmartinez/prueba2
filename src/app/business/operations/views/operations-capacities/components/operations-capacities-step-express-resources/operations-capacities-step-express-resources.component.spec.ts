import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCapacitiesStepExpressResourcesComponent } from './operations-capacities-step-express-resources.component';

describe('OperationsCapacitiesStepExpressResourcesComponent', () => {
  let component: OperationsCapacitiesStepExpressResourcesComponent;
  let fixture: ComponentFixture<OperationsCapacitiesStepExpressResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsCapacitiesStepExpressResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsCapacitiesStepExpressResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
