import { Component } from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {SearchbarComponent} from "../../shared/searchbar/searchbar.component";
import {Game} from "../../shared/types/game.model";
import {SuggestionService} from "../../services/backend/suggestion.service";
import {SelectedGamesService} from "../../services/localstorage/selected-games.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-game-suggestions',
  standalone: true,
  imports: [
    ButtonComponent,
    GameCardComponent,
    NgForOf,
    SearchbarComponent,
    NgIf,
  ],
  templateUrl: './game-suggestions.component.html',
  styleUrl: './game-suggestions.component.scss'
})
export class GameSuggestionsComponent {
  suggestions: Game[] = [];
  loading: boolean = false;
  couldNotLoadGames: boolean = false;

  constructor(private router: Router, private suggestionService: SuggestionService, private selectedGamesService: SelectedGamesService, private toastr: ToastrService) {
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
    this.loading = true;
    this.suggestionService.getSuggestions().subscribe({
      next: (games: Game[]) => {
        this.suggestions = games;
        this.filterOutSelected();
        if (this.suggestions.length === 0) {
          this.toastr.warning('No game suggestions found');
          this.couldNotLoadGames = true;
        }
        this.loading = false;
      },
      error: (error) => { // TODO something useful with the error
        this.toastr.error('Error loading suggestions');
        this.couldNotLoadGames = true;
        this.loading = false;
      }
    });
  }


  filterOutSelected() {
    const savedGames = this.selectedGamesService.loadSelectedGames();

    for (const savedGame of savedGames) {
      const gameIndex = this.suggestions.findIndex((game: Game) => game.id === savedGame.id);
      if (gameIndex > -1) {
        this.suggestions.splice(gameIndex, 1);
      }
    }
  }


}
