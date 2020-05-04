import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBlockCapacityEditionComponent } from './table-block-capacity-edition.component';

describe('TableBlockCapacityEditionComponent', () => {
  let component: TableBlockCapacityEditionComponent;
  let fixture: ComponentFixture<TableBlockCapacityEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBlockCapacityEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBlockCapacityEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
