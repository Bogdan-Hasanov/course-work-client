import { OccupiedPlaces } from './OccupiedPlaces';

export type MovieSession = {
  id: string;
  startDate: Date;
  endDate?: Date | null;
  schemeId: string;
  movieId: string;
  occupiedPlaces: OccupiedPlaces;
};
