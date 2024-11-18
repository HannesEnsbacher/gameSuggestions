import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSuggestionsComponent } from './game-suggestions.component';

describe('GameSuggestionsComponent', () => {
  let component: GameSuggestionsComponent;
  let fixture: ComponentFixture<GameSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSuggestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
