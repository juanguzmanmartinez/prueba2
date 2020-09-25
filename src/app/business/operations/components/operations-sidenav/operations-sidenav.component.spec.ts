import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsSidenavComponent } from './operations-sidenav.component';

describe('OperationsSidenavComponent', () => {
  let component: OperationsSidenavComponent;
  let fixture: ComponentFixture<OperationsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
