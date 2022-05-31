import { MovieSession } from '../../../../../Models/MovieSession';
import './MovieSessionCard.css';
import { useEffect, useState } from 'react';
import SeatScheme from './SeatScheme/SeatScheme';
import axios from 'axios';
import { OccupiedPlaces } from '../../../../../Models/OccupiedPlaces';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../../../../store/selectors/userSelector';

interface SessionProps {
  movieSession: MovieSession;
}

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const MovieSessionCard = (props: SessionProps) => {
  const [schemeOpened, setSchemeOpened] = useState(false);
  const userInfo = useSelector(getUserInfo);
  const [userSeatsForMovie, setUserSeatsForMovie] = useState<OccupiedPlaces | null>(() => {
    if (!userInfo) return null;
    if (!userInfo.selectedSeats) {
      userInfo.selectedSeats = {};
    }
    if (!userInfo.selectedSeats[props.movieSession.movieId])
      userInfo.selectedSeats[props.movieSession.movieId] = {} as OccupiedPlaces;
    return userInfo.selectedSeats[props.movieSession.movieId] ?? ({} as OccupiedPlaces);
  });
  const sessionClickHandler = () => {
    setSchemeOpened(!schemeOpened);
  };

  const saveSession = async (occupiedSeats: OccupiedPlaces) => {
    props.movieSession.occupiedPlaces = occupiedSeats;
    const id = props.movieSession.id;
    await axios.put(`/Session/${encodeURIComponent(id)}`, props.movieSession);
    if (userInfo) {
      if (!userInfo.selectedSeats) {
        userInfo.selectedSeats = {};
      }
      userInfo.selectedSeats[props.movieSession.movieId] = userSeatsForMovie ?? {};
      await axios.put(`/User`, userInfo);
    }
  };

  return (
    <div className={'MovieSessionCard'}>
      <p className={'clickCursor'} onClick={sessionClickHandler}>
        {new Date(props.movieSession.startDate).toLocaleString('uk', options)}
      </p>
      {schemeOpened && (
        <SeatScheme
          key={props.movieSession.schemeId}
          setUserSeatsForMovie={setUserSeatsForMovie}
          userSeatsForMovie={userSeatsForMovie}
          schemeId={props.movieSession.schemeId}
          saveSession={saveSession}
          occupiedPlaces={props.movieSession.occupiedPlaces}
        />
      )}
    </div>
  );
};
export default MovieSessionCard;
