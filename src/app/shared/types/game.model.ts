import {Intensity} from "./intensity.enum";

export interface Game {
  id: number;
  name: string;
  cover?: string
  first_release_date?: Date;
  keywords?: string[];
  platforms?: string[];
  description?: string;

  intensity?: Intensity;
}
