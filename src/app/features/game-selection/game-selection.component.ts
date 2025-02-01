import {Component} from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";
import {Game} from "../../shared/types/game.model";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {SearchbarComponent} from "../../shared/searchbar/searchbar.component";
import {SelectedGamesService} from "../../services/localstorage/selected-games.service";
import {GamesService} from "../../services/backend/games.service";
import {ToastrService} from "ngx-toastr";

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
  couldNotLoadGames: boolean = false;
  loading: boolean = false;

  constructor(private router: Router, private selectedGamesService: SelectedGamesService, private gamesService: GamesService, private toastr: ToastrService) {
  }


  ngOnInit() {
    this.loadTopGames();

  }

  visualizeSelectedGames() {
    const savedGames = this.selectedGamesService.loadSelectedGames();

    for (const savedGame of savedGames) {
      const gameIndex = this.games.findIndex((game: Game) => game.id === savedGame.id);
      if (gameIndex > -1) {
        this.games[gameIndex].intensity = savedGame.intensity;
      }
    }
  }

  loadSelectedGames() {
    this.loading = true;
    this.games = this.selectedGamesService.loadSelectedGames();
    this.loading = false;
    if (this.games.length === 0) {
      this.toastr.warning('No games selected');
      this.couldNotLoadGames = true;
    }
  }

  loadTopGames() {
    this.loading = true;
    this.gamesService.loadTopGames().subscribe({
      next: (games: Game[]) => {
        this.games = games;
        this.visualizeSelectedGames();
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.toastr.error('Error loading games');
        this.couldNotLoadGames = true;
      }
    });
  }

  onNext($event: MouseEvent) {
    if(this.selectedGamesService.loadSelectedGames().length === 0){
      this.toastr.warning('Please select at least one game before proceeding');
      return;
    }
    // this.router.navigate(['/manualPreferences']); // TODO reactivate once the backend can do this
    this.router.navigate(['/gameSuggestions']);
  }

  onBack($event: MouseEvent) {
    this.router.navigate(['/home']);
  }

  onViewSelected($event: MouseEvent) {
    this.couldNotLoadGames = false;
    this.showSelected = !this.showSelected;
    if (this.showSelected) {
      this.loadSelectedGames();
    } else {
      this.loadTopGames();
    }
  }

  getViewSelectedButtonLabel(): string {
    return this.showSelected ? 'View All' : 'View Selected';
  }

  isSelected(game: Game): boolean {
    return game.intensity !== undefined;
  }


  onSearch(searchTerm: any) {
    this.couldNotLoadGames = false;
    this.loading = true;
    if (searchTerm.length === 0) {
      this.loadTopGames();
      return;
    }
    this.gamesService.searchGames(searchTerm).subscribe({
      next: (games: Game[]) => {
        this.loading = false;
        this.games = games;
        this.visualizeSelectedGames();
      },
      error: (error) => { // TODO handle error
        this.loading = false;
        this.toastr.error('Error getting search results');
        this.couldNotLoadGames = true;
      }
    });
    // TODO also include some sort of caching logic preferably on one of the services that will be created
  }

  onClearSelection($event: MouseEvent) {
    this.selectedGamesService.clearSelectedGames();
    this.loadTopGames();
  }
}
