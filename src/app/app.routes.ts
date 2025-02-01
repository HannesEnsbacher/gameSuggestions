import {Routes} from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {TestComponent} from "./test/test.component";
import {GameSelectionComponent} from "./features/game-selection/game-selection.component";
import {ManualPreferenceComponent} from "./features/manual-preference/manual-preference.component";
import {GameSuggestionsComponent} from "./features/game-suggestions/game-suggestions.component";
import {GameDetailsComponent} from "./features/game-details/game-details.component";
import {AboutComponent} from "./pages/about/about.component";
import {PrivacyComponent} from "./pages/privacy/privacy.component";
import {TermsComponent} from "./pages/terms/terms.component";
import {ImpressumComponent} from "./pages/impressum/impressum.component";

export const routes: Routes = [
  {path: '', redirectTo: 'dev', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'impressum', component: ImpressumComponent},
  // {path: 'contact', component: HomeComponent},
  {path: 'gameSelection', component: GameSelectionComponent},
  {path: 'manualPreferences', component: ManualPreferenceComponent},
  {path: 'gameSuggestions', component: GameSuggestionsComponent},
  {path: 'game-details/:id', component: GameDetailsComponent},
  {path: 'dev', component: TestComponent},
  {path: '**', redirectTo: 'home'}
];
