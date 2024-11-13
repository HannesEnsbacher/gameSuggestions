import {booleanAttribute, Component, Input} from '@angular/core';
import {Game} from "../types/game.model";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ButtonComponent} from "../button/button.component";
import {RouterLink} from "@angular/router";
import {Intensity} from "../types/intensity.enum";

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})
export class GameCardComponent {
  @Input() game: Game = {
    id: 0,
    title: 'Default Game Title',
    description: 'Default Game Description',
    genre: ['Default Genre'],
    img: 'https://example.com/default.jpg',
    releaseDate: new Date(),
    popularity: 0
  }; // Default game title
  @Input({transform: booleanAttribute}) selectable: boolean = false;
  @Input({transform: booleanAttribute}) detailsViewable: boolean = false;
  @Input({transform: booleanAttribute}) descriptionActive: boolean = false;


  ngOnInit() {
    // this.loadSelectedPreferences();
  }


  selectIntensity(intensity: Intensity) {
    if (this.game.intensity === intensity) {
      this.game.intensity = undefined;
    } else {
      this.game.intensity = intensity;
    }
    this.saveSelectedPreferences();
  }

  // TODO I will probably need to move the directly localStorage related lines to a service because they might be needed elsewhere

  saveSelectedPreferences() {
    const savedGamesJson = localStorage.getItem('selectedGames');
    let savedGames = [];
    if (savedGamesJson) {
      savedGames = JSON.parse(savedGamesJson);
    }
    const gameIndex = savedGames.findIndex((game: Game) => game.id === this.game.id);
    if (gameIndex > -1) {
      if (!this.game.intensity) {
        savedGames.splice(gameIndex, 1);
      } else {
        savedGames[gameIndex] = this.game;
      }
    } else {
      savedGames.push(this.game);
    }
    localStorage.setItem('selectedGames', JSON.stringify(savedGames));
  }

  // loadSelectedPreferences() {
  //   const savedGamesJson = localStorage.getItem('selectedGames');
  //   if (savedGamesJson) {
  //     const savedGames = JSON.parse(savedGamesJson);
  //     const gameIndex = savedGames.findIndex((game: Game) => game.id === this.game.id);
  //     if (gameIndex > -1) {
  //       this.game.intensity = savedGames[gameIndex].intensity;
  //     }
  //   }
  // }

  protected readonly Intensity = Intensity;
}
