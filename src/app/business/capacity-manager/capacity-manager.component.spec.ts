import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityManagerComponent } from './capacity-manager.component';

describe('CapacityManagerComponent', () => {
  let component: CapacityManagerComponent;
  let fixture: ComponentFixture<CapacityManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacityManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
