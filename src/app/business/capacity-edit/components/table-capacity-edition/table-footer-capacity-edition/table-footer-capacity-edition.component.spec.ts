import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFooterCapacityEditionComponent } from './table-footer-capacity-edition.component';

describe('TableFooterCapacityEditionComponent', () => {
  let component: TableFooterCapacityEditionComponent;
  let fixture: ComponentFixture<TableFooterCapacityEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFooterCapacityEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFooterCapacityEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
