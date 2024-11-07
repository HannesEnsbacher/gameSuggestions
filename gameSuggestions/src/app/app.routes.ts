import {Routes} from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {TestComponent} from "./test/test.component";
import {GameSelectionComponent} from "./features/game-selection/game-selection.component";
import {ManualPreferenceComponent} from "./features/manual-preference/manual-preference.component";
import {GameSuggestionsComponent} from "./features/game-suggestions/game-suggestions.component";
import {GameDetailsComponent} from "./features/game-details/game-details.component";

export const routes: Routes = [
  {path: '', redirectTo: 'dev', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'gameSelection', component: GameSelectionComponent},
  {path: 'manualPreferences', component: ManualPreferenceComponent},
  {path: 'gameSuggestions', component: GameSuggestionsComponent},
  {path: 'game-details/:id', component: GameDetailsComponent},
  {path: 'dev', component: TestComponent}
];
