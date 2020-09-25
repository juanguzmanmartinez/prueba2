import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerSidenavComponent } from './inner-sidenav.component';

describe('InnerSidenavComponent', () => {
  let component: InnerSidenavComponent;
  let fixture: ComponentFixture<InnerSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
