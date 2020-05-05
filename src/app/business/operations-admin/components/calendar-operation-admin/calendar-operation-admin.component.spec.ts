import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarOperationAdminComponent } from './calendar-operation-admin.component';

describe('CalendarOperationAdminComponent', () => {
  let component: CalendarOperationAdminComponent;
  let fixture: ComponentFixture<CalendarOperationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarOperationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarOperationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
