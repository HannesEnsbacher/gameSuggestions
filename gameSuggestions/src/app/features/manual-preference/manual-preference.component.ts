import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ButtonComponent} from "../../shared/button/button.component";

@Component({
  selector: 'app-manual-preference',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './manual-preference.component.html',
  styleUrl: './manual-preference.component.scss'
})
export class ManualPreferenceComponent {


  constructor(private router: Router) {
  }

  onNext($event: MouseEvent) {
    this.router.navigate(['/gameSuggestions']);
  }

  onBack($event: MouseEvent) {
    this.router.navigate(['/gameSelection']);
  }
}
