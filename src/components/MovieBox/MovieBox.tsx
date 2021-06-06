import './MovieBox.scss';
import React, { useState } from 'react';
import { MovieModel } from '../../Models/MovieModel';
import MovieDetails from './MovieDetails/MovieDetails';
import { log } from 'util';

interface MovieBoxProps {
  movie: MovieModel;
}

const movieBox = (props: MovieBoxProps) => {
  const [show, setShow] = useState(false);
  const clickHandler = (show: boolean) => {
    setShow(show);
  };
  return (
    <div className="MovieBox" onClick={() => clickHandler(true)}>
      <MovieDetails show={show} setShow={clickHandler} id={props.movie.id} />
      <p>{props.movie.title}</p>
      {props.movie.image ? (
        <img src={props.movie.image.url} alt="movieImage" />
      ) : (
        <img src="logo.png" alt="movieImage" />
      )}
    </div>
  );
};

export default movieBox;
