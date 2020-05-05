import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableItemCapacityEditionComponent } from './table-item-capacity-edition.component';

describe('TableItemCapacityEditionComponent', () => {
  let component: TableItemCapacityEditionComponent;
  let fixture: ComponentFixture<TableItemCapacityEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableItemCapacityEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableItemCapacityEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
