import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsStoresComponent } from './operations-stores.component';

describe('OperationsStoresComponent', () => {
  let component: OperationsStoresComponent;
  let fixture: ComponentFixture<OperationsStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsStoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
