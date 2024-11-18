import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ButtonComponent} from "../../shared/button/button.component";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {DUMMY_PREFERENCES} from "../../shared/data/dummy-preferences";
import {Preference} from "../../shared/types/preference.model";
import {SearchbarComponent} from "../../shared/searchbar/searchbar.component";
import {SelectedPreferencesService} from "../../services/localstorage/selected-preferences.service";

@Component({
  selector: 'app-manual-preference',
  standalone: true,
  imports: [
    ButtonComponent,
    GameCardComponent,
    NgForOf,
    KeyValuePipe,
    SearchbarComponent,
    NgIf
  ],
  templateUrl: './manual-preference.component.html',
  styleUrl: './manual-preference.component.scss'
})
export class ManualPreferenceComponent {
  groupedPreferences: { [key: string]: Preference[] } = {};
  showSelected: boolean = false;


  constructor(private router: Router, private selectedPreferencesService: SelectedPreferencesService) {
  }


  ngOnInit() {
    this.groupPreferencesByType();
    this.loadSelectedPreferences();
  }

  onNext($event: MouseEvent) {
    this.router.navigate(['/gameSuggestions']);
  }

  onBack($event: MouseEvent) {
    this.router.navigate(['/gameSelection']);
  }

  onViewSelected($event: MouseEvent) {
    this.showSelected = !this.showSelected;
  }

  getViewSelectedButtonLabel(): string {
    return this.showSelected ? 'View All' : 'View Selected';
  }

  onClearSelection($event: MouseEvent) {
    this.selectedPreferencesService.clearSelectedPreferences();
    this.groupPreferencesByType(); // todo this should be replaced by some method that gets the games from backend with caching, or the method that is called here should do that
  }

  groupPreferencesByType() {
    this.groupedPreferences = DUMMY_PREFERENCES.reduce((groups, preference) => {
      const preferenceCopy = {...preference};
      let type = preferenceCopy.type;
      if (!type) {
        type = 'other';
      }
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(preferenceCopy);
      return groups;

    }, {} as { [key: string]: Preference[] });
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  toggleSelectPreference(preference: Preference) {
    preference.selected = !preference.selected;
    this.selectedPreferencesService.saveSingleSelectedPreference(preference);
  }

  loadSelectedPreferences() {
    const savedPreferences = this.selectedPreferencesService.loadSelectedPreferences();
    for (const savedPreference of savedPreferences) {
      const type = savedPreference.type ? savedPreference.type : 'other';
      const preferenceIndex = this.groupedPreferences[type].findIndex((preference: Preference) => preference.id === savedPreference.id);
      if (preferenceIndex > -1) {
        this.groupedPreferences[type][preferenceIndex].selected = true;
      }
    }
  }

  onSearch(searchTerm: any) {
    // TODO send search term to server and get filtered preferences
    // TODO also include some sort of caching logic preferably on one of the services that will be created
  }

  hasSelectedProperty(group: string) {
    return this.groupedPreferences[group].some(preference => preference.selected === true);
  }
}
