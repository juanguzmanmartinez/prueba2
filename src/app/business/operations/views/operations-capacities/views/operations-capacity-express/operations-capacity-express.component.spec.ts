import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCapacityExpressComponent } from './operations-capacity-express.component';

describe('OperationsCapacityExpressComponent', () => {
  let component: OperationsCapacityExpressComponent;
  let fixture: ComponentFixture<OperationsCapacityExpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsCapacityExpressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsCapacityExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
