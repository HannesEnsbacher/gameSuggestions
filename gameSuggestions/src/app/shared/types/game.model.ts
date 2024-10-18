export interface Game {
  id: number;
  title: string;
  description?: string;
  genre?: string[];
  img?: string;

  // Still have to think about those
  popularity?: number;
  score?: number;
  releaseDate?: Date;
}
