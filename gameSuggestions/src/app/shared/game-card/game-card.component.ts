import {booleanAttribute, Component, Input} from '@angular/core';
import {Game} from "../types/game.model";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ButtonComponent} from "../button/button.component";
import {RouterLink} from "@angular/router";
import {Intensity} from "../types/intensity.enum";
import {SelectedGamesService} from "../../services/localstorage/selected-games.service";

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

  constructor(private selectedGamesService: SelectedGamesService) {
  }

  ngOnInit() {
    // this.loadSelectedPreferences();
  }


  selectIntensity(intensity: Intensity) {
    if (this.game.intensity === intensity) {
      this.game.intensity = undefined;
    } else {
      this.game.intensity = intensity;
    }
    this.selectedGamesService.saveSingleSelectedGame(this.game);
  }

  protected readonly Intensity = Intensity;
}
