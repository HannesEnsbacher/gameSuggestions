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
    console.log('searching for games with term', searchTerm);
    const result = this.http.get<Game[]>(`${this.backendApi}/games/search?term=${searchTerm}`);
    result.subscribe(({
      next: (games: Game[]) => {
        console.log('filtered games', games)
      },
      error: (error) => {
        console.error('Error loading filtered games', error); // TODO something useful with the error
      }
    }));
    return this.http.get<Game[]>(`${this.backendApi}/games/search?term=${searchTerm}`);

  }
}
