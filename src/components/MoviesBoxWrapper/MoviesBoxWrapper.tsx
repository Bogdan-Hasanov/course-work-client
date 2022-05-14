import './MoviesBoxWrapper.scss';
import React, { useEffect, useState } from 'react';
import MovieBox from '../MovieBox/MovieBox';
import axios from 'axios';
import { MovieModel } from '../../Models/MovieModel';
import { useSelector } from 'react-redux';
import { getSearchTerm } from '../../store/selectors/authSelector';

const moviesBoxWrapper = () => {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [prevSearchTerm, setPrevSearchTerm] = useState<string>('');
  const searchTerm = useSelector(getSearchTerm);

  useEffect(() => {
    if (prevSearchTerm !== searchTerm) {
      setPrevSearchTerm(searchTerm);
      axios.get<MovieModel[]>(`/Movie/SendSearch/${encodeURI(searchTerm)}`).then(response => setMovies(response.data));
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
