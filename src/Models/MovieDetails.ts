import { ImageModel } from './MovieModel';

type MovieDetailsModel = {
  id: string;
  title: string;
  image: ImageModel;
  titleType: string;
  year: string;
  seriesEndYear: string;
  seriesStartYear: string;
  numberOfEpisodes: string;
};

export default MovieDetailsModel;
