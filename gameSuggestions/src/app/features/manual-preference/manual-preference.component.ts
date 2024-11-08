import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ButtonComponent} from "../../shared/button/button.component";
import {GameCardComponent} from "../../shared/game-card/game-card.component";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {DUMMY_PREFERENCES} from "../../shared/data/dummy-preferences";
import {Preference} from "../../shared/types/preference.model";
import {SearchbarComponent} from "../../shared/searchbar/searchbar.component";

@Component({
  selector: 'app-manual-preference',
  standalone: true,
  imports: [
    ButtonComponent,
    GameCardComponent,
    NgForOf,
    KeyValuePipe,
    SearchbarComponent
  ],
  templateUrl: './manual-preference.component.html',
  styleUrl: './manual-preference.component.scss'
})
export class ManualPreferenceComponent {
  groupedPreferences: { [key: string]: Preference[] } = {};
  selectedPreferences: Preference[] = [];


  constructor(private router: Router) {
  }


  ngOnInit() {
    this.loadSelectedPreferences();
    this.groupPreferencesByType();
  }

  onNext($event: MouseEvent) {
    this.router.navigate(['/gameSuggestions']);
  }

  onBack($event: MouseEvent) {
    this.router.navigate(['/gameSelection']);
  }

  onViewSelected($event: MouseEvent) {

  }

  onClearSelection($event: MouseEvent) {
    console.log('Clear Selection')
  }

  groupPreferencesByType() {
    this.groupedPreferences = DUMMY_PREFERENCES.reduce((groups, preference) => {
      let type = preference.type;
      if (!type) {
        type = 'other';
      }
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(preference);
      return groups;

    }, {} as { [key: string]: Preference[] });
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  toggleSelectPreference(preference: Preference) {
    if (this.isSelected(preference)) {
      this.selectedPreferences = this.selectedPreferences.filter(p => p.id !== preference.id);
    } else {
      this.selectedPreferences.push(preference);
    }
    this.saveSelectedPreferences();
  }

  saveSelectedPreferences() {
    localStorage.setItem('selectedPreferences', JSON.stringify(this.selectedPreferences));
  }

  loadSelectedPreferences() {
    const savedPreferences = localStorage.getItem('selectedPreferences');
    if (savedPreferences) {
      this.selectedPreferences = JSON.parse(savedPreferences);
    }
  }

  isSelected(preference: Preference): boolean {
    return this.selectedPreferences.some(p => p.id === preference.id);
  }

  onSearch($event: any) {

  }
}
