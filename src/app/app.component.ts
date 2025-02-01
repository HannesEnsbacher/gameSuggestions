import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CoreModule} from "./core/core.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gameSuggestions';
}
