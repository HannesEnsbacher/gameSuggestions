import { TestBed } from '@angular/core/testing';

import { SelectedGamesService } from './selected-games.service';

describe('SelectedGamesService', () => {
  let service: SelectedGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
