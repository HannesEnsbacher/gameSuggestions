import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CoreModule} from "./core/core.module";
import {CookieConsentService} from "./services/cookies/cookie-consent.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gameSuggestions';
  private cookieConsentService = inject(CookieConsentService);


  ngAfterViewInit(): void {
    this.cookieConsentService.initCookieConsent();
  }
}
