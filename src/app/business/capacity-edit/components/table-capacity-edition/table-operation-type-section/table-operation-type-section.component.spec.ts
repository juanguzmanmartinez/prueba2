import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOperationTypeSectionComponent } from './table-operation-type-section.component';

describe('TableOperationTypeSectionComponent', () => {
  let component: TableOperationTypeSectionComponent;
  let fixture: ComponentFixture<TableOperationTypeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOperationTypeSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOperationTypeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
