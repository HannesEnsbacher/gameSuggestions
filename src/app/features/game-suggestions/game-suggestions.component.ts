import { Component } from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {NgForOf} from "@angular/common";
import {SearchbarComponent} from "../../shared/searchbar/searchbar.component";
import {Game} from "../../shared/types/game.model";
import {SuggestionService} from "../../services/backend/suggestion.service";

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

  constructor(private router: Router, private suggestionService: SuggestionService) {
  }

  ngOnInit() {
    this.loadSuggestions();
    // TODO change this to fetch suggestions based on the user's preferences from the backend
  }

  onDonate($event: MouseEvent) {
    console.log('Donate button clicked', $event)
    // TODO: Implement onDonate with buy me a coffee link
  }

  onBack($event: MouseEvent) {
    // this.router.navigate(['/manualPreferences']);// TODO reactivate once the backend can do this
    this.router.navigate(['/gameSelection']);
  }

  onReload($event: MouseEvent) {

    this.loadSuggestions();
  }

  private loadSuggestions() {
    this.suggestionService.getSuggestions().subscribe({
      next: (games: Game[]) => {
        this.suggestions = games;
      },
      error: (error) => {
        console.error('Error loading suggestions', error); // TODO something useful with the error
      }
    });
  }


}
