import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerSidenavNavigationComponent } from './inner-sidenav-navigation.component';

describe('InnerSidenavNavigationComponent', () => {
  let component: InnerSidenavNavigationComponent;
  let fixture: ComponentFixture<InnerSidenavNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerSidenavNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerSidenavNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
