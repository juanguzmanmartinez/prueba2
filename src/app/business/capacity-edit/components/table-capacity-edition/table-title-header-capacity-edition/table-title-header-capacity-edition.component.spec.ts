import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTitleHeaderCapacityEditionComponent } from './table-title-header-capacity-edition.component';

describe('TableTitleHeaderCapacityEditionComponent', () => {
  let component: TableTitleHeaderCapacityEditionComponent;
  let fixture: ComponentFixture<TableTitleHeaderCapacityEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTitleHeaderCapacityEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTitleHeaderCapacityEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
