import { Injectable } from '@angular/core';
import {Preference} from "../../shared/types/preference.model";

@Injectable({
  providedIn: 'root'
})
export class SelectedPreferencesService {

  constructor() { }

  saveSelectedPreferences(preferences: Preference[]) {
    localStorage.setItem('selectedPreferences', JSON.stringify(preferences));
  }

  saveSingleSelectedPreference(preference: Preference) {
    const savedPreferencesJson = localStorage.getItem('selectedPreferences');
    let savedPreferences = [];
    if (savedPreferencesJson) {
      savedPreferences = JSON.parse(savedPreferencesJson);
    }
    const preferenceIndex = savedPreferences.findIndex((pref: Preference) => pref.id === preference.id);
    if (preferenceIndex > -1) {
      if (!preference.selected) {
        savedPreferences.splice(preferenceIndex, 1);
      } else {
        savedPreferences.push(preference);
      }
    } else {
      savedPreferences.push(preference);
    }
    localStorage.setItem('selectedPreferences', JSON.stringify(savedPreferences));
  }

  loadSelectedPreferences() : Preference[] {
    const savedPreferences = localStorage.getItem('selectedPreferences');
    if (savedPreferences) {
      try {
        return JSON.parse(savedPreferences);
      } catch (error) {
        console.error('Error parsing selected preferences from localStorage', error);
        return [];
      }
    }
    return [];
  }

  clearSelectedPreferences() {
    localStorage.removeItem('selectedPreferences');
  }
}
