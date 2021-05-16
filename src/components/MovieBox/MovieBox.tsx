import './MovieBox.scss';
import React, { useState } from 'react';
import { MovieModel } from '../../Models/MovieModel';
import MovieDetails from './MovieDetails/MovieDetails';

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
      <img src={props.movie.image.url} alt="movieImage" />
    </div>
  );
};

export default movieBox;
