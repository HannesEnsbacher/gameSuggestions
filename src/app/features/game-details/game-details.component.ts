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
    title: 'Default Game Title',
    description: 'Default Game Description',
    genre: ['Default Genre'],
    img: 'https://example.com/default.jpg',
    releaseDate: new Date(),
    popularity: 0
  }; // Default game title

  selectedIntensity: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.game.id = +id;
        this.game = DUMMY_GAMES.find(game => game.id === this.game.id) || this.game;
      }
    });
  }

}
