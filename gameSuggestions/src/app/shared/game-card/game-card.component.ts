import {booleanAttribute, Component, Input} from '@angular/core';
import {Game} from "../types/game.model";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonComponent,
    NgIf
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

  selectedIntensity: string = '';


  onSelectButton() {

  }

  onDetailsButton() {

  }

  selectIntensity(intensity: string) {
    this.selectedIntensity = intensity;
    console.log(this.selectedIntensity)
  }
}
