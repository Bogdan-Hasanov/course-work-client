import './MovieBox.scss';
import React from 'react';
import { MovieModel } from '../Models/MovieModel';

interface MovieBoxProps {
  movie: MovieModel;
}

const movieBox = (props: MovieBoxProps) => (
  <div className="MovieBox">
    <p>{props.movie.title}</p>
    <img src={props.movie.image.url} alt="movieImage" />
  </div>
);

export default movieBox;
