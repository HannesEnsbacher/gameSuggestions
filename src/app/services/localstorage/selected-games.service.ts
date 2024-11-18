import {Injectable} from '@angular/core';
import {Game} from "../../shared/types/game.model";

@Injectable({
  providedIn: 'root'
})
export class SelectedGamesService {

  constructor() {
  }

  saveSelectedGames(selectedGames: Game[]) {
    localStorage.setItem('selectedPreferences', JSON.stringify(selectedGames));
  }

  saveSingleSelectedGame(selectedGame: Game) {
    const savedGamesJson = localStorage.getItem('selectedGames');
    let savedGames = [];
    if (savedGamesJson) {
      savedGames = JSON.parse(savedGamesJson);
    }
    const gameIndex = savedGames.findIndex((game: Game) => game.id === selectedGame.id);
    if (gameIndex > -1) {
      if (selectedGame.intensity === undefined) {
        savedGames.splice(gameIndex, 1);
      } else {
        savedGames[gameIndex] = selectedGame;
      }
    } else {
      savedGames.push(selectedGame);
    }
    localStorage.setItem('selectedGames', JSON.stringify(savedGames));
  }


  loadSelectedGames(): Game[] {
    const savedGames = localStorage.getItem('selectedGames');
    if (savedGames) {
      try {
        return JSON.parse(savedGames);
      } catch (error) {
        console.error('Error parsing selected games from localStorage', error);
        return [];
      }
    }
    return [];
  }

  clearSelectedGames() {
    localStorage.removeItem('selectedGames');
  }
}
