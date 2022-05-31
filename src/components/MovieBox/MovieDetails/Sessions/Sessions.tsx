import { useEffect, useState } from 'react';
import { MovieSession } from '../../../../Models/MovieSession';
import axios from 'axios';
import MovieSessionCard from './Session/MovieSessionCard';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../../../store/selectors/userSelector';
import { UserType } from '../../../../Models/enum/UserType';
import EmptySessionCard from './EmptySessionCard/EmptySessionCard';

interface SessionsProps {
  movieId: string;
}

const Sessions = (props: SessionsProps) => {
  const [movieSessions, setMovieSessions] = useState<MovieSession[]>();
  const userInfo = useSelector(getUserInfo);

  const fetchMovieSessions = () => {
    axios.get<MovieSession[]>(`/Movie/${encodeURIComponent(props.movieId)}/Sessions`).then(response => {
      setMovieSessions(response.data);
    });
  };

  useEffect(() => {
    fetchMovieSessions();
  }, []);
  return (
    <div>
      {movieSessions
        ? movieSessions
            .sort(
              (a, b) =>
                +(new Date(a.startDate).getTime() > new Date(b.startDate).getTime()) -
                +(new Date(a.startDate).getTime() < new Date(b.startDate).getTime()),
            )
            .filter(value => new Date(value.startDate).getTime() > Date.now())
            .map(movieSession => <MovieSessionCard key={movieSession.id} movieSession={movieSession} />)
        : null}
      {userInfo?.role === UserType.Admin && (
        <EmptySessionCard movieId={props.movieId} fetchMovieSessions={fetchMovieSessions} />
      )}
    </div>
  );
};
export default Sessions;
