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
import { UserInfo } from '../../../Models/UserInfo';

interface MovieBoxProps {
  id: string;
  setShow: (show: boolean) => void;
  show: boolean;
}

const movieDetails = (props: MovieBoxProps) => {
  // const [open, setOpen] = React.useState(false);
  const [movieDetails, setMovieDetails] = React.useState<MovieDetailsModel>();
  const [userInfo, setUserInfo] = React.useState<UserInfo>();

  const handleOpen = () => {
    if (!movieDetails && props.show) {
      Promise.all([
        axios.get<MovieDetailsModel>(`https://localhost:5001/Movie/GetMovieById/${encodeURIComponent(props.id)}`),
        axios.get<UserInfo>(`https://localhost:5001/User`),
      ]).then(responses => {
        setMovieDetails(responses[0].data);
        setUserInfo(responses[1].data as UserInfo);
      });
    }
  };

  useEffect(() => console.log('userInfo: ', userInfo?.movieMarks[props.id]), [userInfo]);

  useEffect(handleOpen, [props.show]);

  const setRatingHandler = (event: any, value: number | null) => {
    if (userInfo != undefined) {
      if (userInfo.movieMarks == undefined) userInfo.movieMarks = {} as Record<string, number>;
      userInfo.movieMarks[props.id] = value ?? 0;
      axios.put(`https://localhost:5001/User`, userInfo).then(() => console.log('mark was set'));
    }
  };

  const handleClose = (event: any) => {
    if (event as React.MouseEvent<HTMLButtonElement, MouseEvent>) event.stopPropagation();
    props.setShow(false);
  };

  const rating = (
    <Rating
      name="customized-10"
      defaultValue={userInfo?.movieMarks != undefined ? userInfo?.movieMarks[props.id] ?? 0 : 0}
      value={userInfo?.movieMarks[props.id]}
      onChange={setRatingHandler}
      max={10}
    />
  );

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
          {userInfo ? rating : null}
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
