import { Component } from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";
import {Game} from "../../shared/types/game.model";
import {DUMMY_GAMES} from "../../shared/data/dummy-games";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-game-selection',
  standalone: true,
  imports: [
    ButtonComponent,
    GameCardComponent,
    NgForOf
  ],
  templateUrl: './game-selection.component.html',
  styleUrl: './game-selection.component.scss'
})
export class GameSelectionComponent {
  games: Game[] = [];

  constructor(private router: Router) {
  }



  ngOnInit() {
    this.games = DUMMY_GAMES;
  }
  onNext($event: MouseEvent) {
    this.router.navigate(['/manualPreferences']);
  }
  onBack($event: MouseEvent) {
    this.router.navigate(['/home']);
  }

  onViewSelected($event: MouseEvent) {
    console.log('View Selected')
  }

  onSelectGame() {
    console.log('Game Selected');
  }

  onViewDetails() {
    console.log('View Details');
  }
}
