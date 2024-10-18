import {Component, Input} from '@angular/core';
import {Game} from "../types/game.model";
import {NgOptimizedImage} from "@angular/common";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonComponent
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
  @Input() primaryButtonLabel: string = "";
  @Input() secondaryButtonLabel: string = "";
  @Input() onPrimaryButton: () => void = () => console.log("Primary"); // Primary button click handler
  @Input() onSecondaryButton: () => void = () => console.log("Secondary"); // Secondary button click handler


}
