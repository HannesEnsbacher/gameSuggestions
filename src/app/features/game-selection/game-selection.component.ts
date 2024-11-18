import {Component} from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";
import {Game} from "../../shared/types/game.model";
import {DUMMY_GAMES} from "../../shared/data/dummy-games";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {SearchbarComponent} from "../../shared/searchbar/searchbar.component";
import {SelectedGamesService} from "../../services/localstorage/selected-games.service";

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

  constructor(private router: Router, private selectedGamesService: SelectedGamesService) {
  }


  ngOnInit() {
    this.games = DUMMY_GAMES;
    this.loadSelectedGames();
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


  onNext($event: MouseEvent) {
    this.router.navigate(['/manualPreferences']);
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
    // TODO send search term to server and get filtered preferences
    // TODO also include some sort of caching logic preferably on one of the services that will be created
  }

  onClearSelection($event: MouseEvent) {
    this.selectedGamesService.clearSelectedGames();

    this.games.forEach((game: Game) => game.intensity = undefined); // todo this should be replaced by some method that gets the games from backend with caching
  }
}
