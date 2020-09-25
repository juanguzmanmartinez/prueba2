import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCapacityHomeComponent } from './operations-capacity-home.component';

describe('OperationsCapacityHomeComponent', () => {
  let component: OperationsCapacityHomeComponent;
  let fixture: ComponentFixture<OperationsCapacityHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsCapacityHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsCapacityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
