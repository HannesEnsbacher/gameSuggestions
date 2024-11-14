import { TestBed } from '@angular/core/testing';

import { SelectedPreferencesService } from './selected-preferences.service';

describe('SelectedPreferencesService', () => {
  let service: SelectedPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
