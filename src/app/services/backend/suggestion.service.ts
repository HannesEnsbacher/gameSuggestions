import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../../shared/types/game.model";
import {SelectedGamesService} from "../localstorage/selected-games.service";
import {SelectedPreferencesService} from "../localstorage/selected-preferences.service";

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private backendApi = environment.backendUrl;

  constructor(private http: HttpClient, private selectedGamesService: SelectedGamesService, private selectedPreferencesService: SelectedPreferencesService) {
  }

  getSuggestions(): Observable<Game[]> {
    const selectedGames = this.selectedGamesService.loadSelectedGames();
    // const selectedPreferences = this.selectedPreferencesService.loadSelectedPreferences(); // TODO add this later
    console.log('fetching suggestions for: ' + JSON.stringify(selectedGames));
    return this.http.post<Game[]>(`${this.backendApi}/suggest`,
      {'selectedGames': selectedGames});
  }
}
