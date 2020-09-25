import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsSettingComponent } from './operations-setting.component';

describe('OperationsSettingComponent', () => {
  let component: OperationsSettingComponent;
  let fixture: ComponentFixture<OperationsSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
