import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsZonesComponent } from './operations-zones.component';

describe('OperationsZonesComponent', () => {
  let component: OperationsZonesComponent;
  let fixture: ComponentFixture<OperationsZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsZonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
