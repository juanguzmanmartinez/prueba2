import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCapacityScheduledComponent } from './operations-capacity-scheduled.component';

describe('OperationsCapacityScheduledComponent', () => {
  let component: OperationsCapacityScheduledComponent;
  let fixture: ComponentFixture<OperationsCapacityScheduledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsCapacityScheduledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsCapacityScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
