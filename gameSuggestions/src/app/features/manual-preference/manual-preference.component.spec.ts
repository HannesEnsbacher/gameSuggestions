import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPreferenceComponent } from './manual-preference.component';

describe('ManualPreferenceComponent', () => {
  let component: ManualPreferenceComponent;
  let fixture: ComponentFixture<ManualPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualPreferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
