import { Component } from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {NgForOf} from "@angular/common";
import {SearchbarComponent} from "../../shared/searchbar/searchbar.component";
import {DUMMY_GAMES} from "../../shared/data/dummy-games";
import {Game} from "../../shared/types/game.model";

@Component({
  selector: 'app-game-suggestions',
  standalone: true,
    imports: [
        ButtonComponent,
        GameCardComponent,
        NgForOf,
        SearchbarComponent
    ],
  templateUrl: './game-suggestions.component.html',
  styleUrl: './game-suggestions.component.scss'
})
export class GameSuggestionsComponent {
  suggestions: Game[] = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.suggestions = DUMMY_GAMES;
    // TODO change this to fetch suggestions based on the user's preferences from the backend
  }

  onDonate($event: MouseEvent) {
    console.log('Donate button clicked', $event)
    // TODO: Implement onDonate
  }

  onBack($event: MouseEvent) {
    this.router.navigate(['/manualPreferences']);
  }

  onReload($event: MouseEvent) {
    // TODO change this to use the same backend call as ngOnInit
  }
}
