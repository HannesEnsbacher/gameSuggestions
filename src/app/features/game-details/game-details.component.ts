import { Component } from '@angular/core';
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {ActivatedRoute} from "@angular/router";
import {DUMMY_GAMES} from "../../shared/data/dummy-games";
import {Game} from "../../shared/types/game.model";

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [
    GameCardComponent
  ],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent {
  game: Game = {
    id: 0,
    name: 'Loading Game Title',
    description: 'Loading Game Description',
    keywords: ['Loading Keywords'],
    cover: 'https://example.com/default.jpg',
    first_release_date: new Date(),
  }; // Default game title

  selectedIntensity: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() { // TODO either we need a route in backend that gets the game by id or, since we have all data already we should hand it over to the game-details component
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.game.id = +id;
        this.game = DUMMY_GAMES.find(game => game.id === this.game.id) || this.game;
      }
    });
  }

}
