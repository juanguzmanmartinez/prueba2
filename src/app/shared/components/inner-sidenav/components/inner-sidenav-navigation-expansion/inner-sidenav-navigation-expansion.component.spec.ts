import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerSidenavNavigationExpansionComponent } from './inner-sidenav-navigation-expansion.component';

describe('InnerSidenavNavigationExpansionComponent', () => {
  let component: InnerSidenavNavigationExpansionComponent;
  let fixture: ComponentFixture<InnerSidenavNavigationExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerSidenavNavigationExpansionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerSidenavNavigationExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
