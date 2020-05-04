import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCapacityEditionComponent } from './table-capacity-edition.component';

describe('TableCapacityEditionComponent', () => {
  let component: TableCapacityEditionComponent;
  let fixture: ComponentFixture<TableCapacityEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCapacityEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCapacityEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
