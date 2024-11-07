import {Intensity} from "./intensity.enum";

export interface Game {
  id: number;
  title: string;
  description?: string;
  genre?: string[];
  img?: string
  intensity?: Intensity;

  // Still have to think about those
  popularity?: number;
  score?: number;
  releaseDate?: Date;
}
