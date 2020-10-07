import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCapacitiesComponent } from './operations-capacities.component';

describe('OperationsCapacitiesComponent', () => {
  let component: OperationsCapacitiesComponent;
  let fixture: ComponentFixture<OperationsCapacitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsCapacitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsCapacitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
