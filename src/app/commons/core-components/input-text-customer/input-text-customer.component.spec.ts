import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextCustomerComponent } from './input-text-customer.component';

describe('InputTextCustomerComponent', () => {
  let component: InputTextCustomerComponent;
  let fixture: ComponentFixture<InputTextCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
