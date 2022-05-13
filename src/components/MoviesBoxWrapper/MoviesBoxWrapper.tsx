import './MoviesBoxWrapper.scss';
import React, { useEffect, useState } from 'react';
import MovieBox from '../MovieBox/MovieBox';
import axios from 'axios';
import { MovieModel } from '../../Models/MovieModel';
import { connect } from 'react-redux';

const moviesBoxWrapper = (props: any) => {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [prevSearchTerm, setPrevSearchTerm] = useState<string>('');

  useEffect(() => {
    if (prevSearchTerm !== props.searchTerm) {
      setPrevSearchTerm(props.searchTerm);
      axios
        .get<MovieModel[]>(`/Movie/SendSearch/${encodeURI(props.searchTerm)}`)
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

const mapStateToProps = (state: any) => {
  return {
    searchTerm: state.searchTerm,
  };
};

export default connect(mapStateToProps)(moviesBoxWrapper);
