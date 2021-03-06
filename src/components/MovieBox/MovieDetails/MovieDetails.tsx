import './MovieDetails.scss';
import React, { useEffect } from 'react';
import MovieDetailsModel from '../../../Models/MovieDetails';
import Rating from '@material-ui/lab/Rating';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import axios from 'axios';
import Sessions from './Sessions/Sessions';
import { fetchUser, saveUserInfo } from '../../../store/operations/auth-operations';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../../store/selectors/userSelector';

interface MovieBoxProps {
  id: string;
  setShow: (show: boolean) => void;
  show: boolean;
}

const movieDetails = (props: MovieBoxProps) => {
  const [movieDetails, setMovieDetails] = React.useState<MovieDetailsModel>();
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);

  const handleOpen = () => {
    if (!props.show) return;
    if (!movieDetails) {
      axios.get<MovieDetailsModel>(`/Movie/GetMovieById/${encodeURIComponent(props.id)}`).then(response => {
        setMovieDetails(response.data);
      });
    }
    dispatch(fetchUser());
  };

  useEffect(handleOpen, [props.show]);

  const setRatingHandler = (event: any, value: number | null) => {
    if (userInfo != undefined) {
      if (userInfo.movieMarks == undefined) userInfo.movieMarks = {} as Record<string, number>;
      userInfo.movieMarks[props.id] = value ?? 0;
      dispatch(saveUserInfo(userInfo));
    }
  };

  const handleClose = (event: any) => {
    if (event as React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      event.stopPropagation();
    }
    props.setShow(false);
  };

  const rating = (
    <Rating
      name="customized-10"
      defaultValue={userInfo?.movieMarks != undefined ? userInfo?.movieMarks[props.id] ?? 0 : 0}
      value={userInfo?.movieMarks?.[props.id]}
      onChange={setRatingHandler}
      max={10}
    />
  );

  let body;
  if (movieDetails !== undefined) {
    body = (
      <div className={'MovieDetails'}>
        <h2 id="simple-modal-title">
          {movieDetails.image ? (
            <img src={movieDetails.image.url} alt="Movie image" />
          ) : (
            <img src="/public/movieplaceholder.png" alt="Movie image" />
          )}
        </h2>
        <p id="simple-modal-description">
          {movieDetails.seriesStartYear == null
            ? 'Year ' + movieDetails.year
            : `Years (${movieDetails.seriesStartYear} - ${movieDetails.seriesEndYear ?? 'Present'})`}
        </p>
        <p> {movieDetails.numberOfEpisodes ? 'Episodes ' + movieDetails.numberOfEpisodes : ''}</p>
        {userInfo ? (
          <>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Rate movie</Typography>
              {rating}
            </Box>
          </>
        ) : null}
        <Sessions movieId={props.id} />
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
