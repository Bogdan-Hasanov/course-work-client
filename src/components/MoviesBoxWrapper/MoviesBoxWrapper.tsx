import './MoviesBoxWrapper.scss';
import React, { useEffect, useState } from 'react';
import MovieBox from '../MovieBox/MovieBox';
import axios from 'axios';
import { MovieModel } from '../Models/MovieModel';

const moviesBoxWrapper = () => {
  const [movies, setMovies] = useState<MovieModel[]>([]);

  useEffect(() => {
    if (movies.length === 0) {
      axios
        .get<MovieModel[]>('https://localhost:5001/Movie/SendSearch/game')
        .then(response => setMovies(response.data));
    }
  });

  return (
    <div className="MoviesBoxWrapper">
      {movies.map(movie => (
        <MovieBox key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default moviesBoxWrapper;
