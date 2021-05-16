import './MovieDetails.scss';
import React, { useEffect } from 'react';
import MovieDetailsModel from '../../../Models/MovieDetails';
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import axios from 'axios';

interface MovieBoxProps {
  id: string;
  setShow: (show: boolean) => void;
  show: boolean;
}

const movieDetails = (props: MovieBoxProps) => {
  // const [open, setOpen] = React.useState(false);
  const [movieDetails, setMovieDetails] = React.useState<MovieDetailsModel>();

  const handleOpen = () => {
    if (!movieDetails && props.show) {
      console.log('sending axios' + props.show);
      axios
        .get<MovieDetailsModel>(`https://localhost:5001/Movie/GetMovieById/${encodeURIComponent(props.id)}`)
        .then(response => {
          setMovieDetails(response.data as MovieDetailsModel);
        });
    }
  };
  useEffect(handleOpen, [props.show]);

  const handleClose = (event: any) => {
    if (event as React.MouseEvent<HTMLButtonElement, MouseEvent>) event.stopPropagation();
    props.setShow(false);
  };

  let body;
  if (movieDetails !== undefined) {
    body = (
      <div className={'MovieDetails'}>
        <h2 id="simple-modal-title">
          <img src={movieDetails.image.url} alt="Movie image" />
        </h2>
        <p id="simple-modal-description">
          {movieDetails.seriesStartYear == null
            ? 'Year ' + movieDetails.year
            : `Years (${movieDetails.seriesStartYear} - ${movieDetails.seriesEndYear})`}
        </p>
        <p> {movieDetails.numberOfEpisodes ? 'Episodes ' + movieDetails.numberOfEpisodes : ''}</p>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Rate movie</Typography>
          <Rating name="customized-10" defaultValue={2} max={10} />
        </Box>
      </div>
    );
  } else {
    body = (
      <div className={'MovieDetails'}>
        <h2 id="simple-modal-title">{'Loading image'}</h2>
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Dialog
        open={props.show}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle id="confirmation-dialog-title">{movieDetails?.title ?? 'Loading'}</DialogTitle>
        <DialogContent dividers> {body}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default movieDetails;
