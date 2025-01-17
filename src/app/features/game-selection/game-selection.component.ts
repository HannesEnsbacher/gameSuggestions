import {Component} from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";
import {Game} from "../../shared/types/game.model";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {SearchbarComponent} from "../../shared/searchbar/searchbar.component";
import {SelectedGamesService} from "../../services/localstorage/selected-games.service";
import {GamesService} from "../../services/backend/games.service";

@Component({
  selector: 'app-game-selection',
  standalone: true,
  imports: [
    ButtonComponent,
    GameCardComponent,
    NgForOf,
    SearchbarComponent,
    NgIf
  ],
  templateUrl: './game-selection.component.html',
  styleUrl: './game-selection.component.scss'
})
export class GameSelectionComponent {
  games: Game[] = [];
  showSelected: boolean = false;

  constructor(private router: Router, private selectedGamesService: SelectedGamesService, private gamesService: GamesService) {
  }


  ngOnInit() {
    this.loadTopGames();


  }

  loadSelectedGames() {
    const savedGames = this.selectedGamesService.loadSelectedGames();

    for (const savedGame of savedGames) {
      const gameIndex = this.games.findIndex((game: Game) => game.id === savedGame.id);
      if (gameIndex > -1) {
        this.games[gameIndex].intensity = savedGame.intensity;
      }
    }
  }

  loadTopGames() {
    this.gamesService.loadTopGames().subscribe({
      next: (games: Game[]) => {
        this.games = games;
        this.loadSelectedGames();
      },
      error: (error) => {
        console.error('Error loading top games', error); // TODO something useful with the error
      }
    });
  }


  onNext($event: MouseEvent) {
    // this.router.navigate(['/manualPreferences']); // TODO reactivate once the backend can do this
    this.router.navigate(['/gameSuggestions']);
  }

  onBack($event: MouseEvent) {
    this.router.navigate(['/home']);
  }

  onViewSelected($event: MouseEvent) {
    this.showSelected = !this.showSelected;
  }

  getViewSelectedButtonLabel(): string {
    return this.showSelected ? 'View All' : 'View Selected';
  }

  isSelected(game: Game): boolean {
    return game.intensity !== undefined;
  }


  onSearch(searchTerm: any) {
    if (searchTerm.length === 0) {
      this.loadTopGames();
      return;
    }
    this.gamesService.searchGames(searchTerm).subscribe({
      next: (games: Game[]) => {
        this.games = games;
        this.loadSelectedGames();
      },
      error: (error) => {
        console.error('Error loading filtered games', error); // TODO something useful with the error
      }
    });
    // TODO also include some sort of caching logic preferably on one of the services that will be created
  }

  onClearSelection($event: MouseEvent) {
    this.selectedGamesService.clearSelectedGames();
    this.loadTopGames();
  }
}
