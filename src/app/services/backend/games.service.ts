import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
import {Game} from "../../shared/types/game.model";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private backendApi = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  loadTopGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.backendApi}/games/top-games`);
  }

  searchGames(searchTerm: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.backendApi}/games/search?term=${searchTerm}`);
  }
}
