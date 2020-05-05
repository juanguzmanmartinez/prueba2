import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBodyCapacityEditionComponent } from './table-body-capacity-edition.component';

describe('TableBodyCapacityEditionComponent', () => {
  let component: TableBodyCapacityEditionComponent;
  let fixture: ComponentFixture<TableBodyCapacityEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBodyCapacityEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBodyCapacityEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
