import { Component } from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-suggestions',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './game-suggestions.component.html',
  styleUrl: './game-suggestions.component.scss'
})
export class GameSuggestionsComponent {

  constructor(private router: Router) {
  }
  onDonate($event: MouseEvent) {
    console.log('Donate button clicked', $event)
    // TODO: Implement onDonate
  }

  onBack($event: MouseEvent) {
    this.router.navigate(['/manualPreferences']);
  }
}
