import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityAmPmComponent } from './capacity-am-pm.component';

describe('CapacityAmPmComponent', () => {
  let component: CapacityAmPmComponent;
  let fixture: ComponentFixture<CapacityAmPmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacityAmPmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityAmPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
