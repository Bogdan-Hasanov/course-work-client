import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './MovieSlider.scss';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import axios from 'axios';
import { MovieModel } from '../../Models/MovieModel';
import MovieBox from '../MovieBox/MovieBox';
import { connect } from 'react-redux';

const MovieSlider = (props: any) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [prevSearchTerm, setPrevSearchTerm] = useState<string>('');

  useEffect(() => {
    if (prevSearchTerm !== props.searchTerm) {
      setPrevSearchTerm(props.searchTerm);
      axios
        .get<MovieModel[]>(`http://178.150.48.202:5000/Movie/SendSearch/${encodeURI(props.searchTerm)}`)
        .then(response => setMovies(response.data));
    }
  });
  return (
    <div>
      <h2> Movies with slider</h2>
      <Slider {...settings}>
        {movies.map(movie => (
          <MovieBox key={movie.id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    searchTerm: state.searchTerm,
  };
};

export default connect(mapStateToProps)(MovieSlider);
