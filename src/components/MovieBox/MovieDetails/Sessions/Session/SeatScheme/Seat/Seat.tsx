import React from 'react';

import './Seat.css';
import { SeatNumber } from '../../../../../../../Models/SeatNumber';
import { OccupiedPlaces } from '../../../../../../../Models/OccupiedPlaces';
import { useSelector } from 'react-redux';
import { getLoggedIn } from '../../../../../../../store/selectors/authSelector';

interface SeatProps {
  seatNum?: SeatNumber;
  seatColor?: 'seat-grey' | 'seat-black' | 'seat-green';
  chosenSeats: OccupiedPlaces;
  setChosenSeats: (setChosenSeats: (prev: OccupiedPlaces) => OccupiedPlaces) => void;
  editable: boolean;
  userSeatsForMovie: OccupiedPlaces | null;
  setUserSeatsForMovie: (occupiedSeats: OccupiedPlaces) => void;
}

const Seat = (props: SeatProps) => {
  const seatNumber = props.seatNum;
  const seatStatus = props.seatColor ?? 'seat-grey';
  const loggedIn = useSelector(getLoggedIn);

  const seatClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!props.editable) return;
    event.stopPropagation();
    if (seatNumber === undefined) return;
    const seatColor = document.querySelector(`.seat-${seatNumber.row + '-' + seatNumber.seat}`)?.classList;
    if (seatColor === undefined) return;
    if (!loggedIn) return;
    if (!props.userSeatsForMovie) {
      return;
    }
    if (props.userSeatsForMovie?.[seatNumber.row]?.includes(seatNumber.seat)) {
      // }
      // if (props.chosenSeats[seatNumber.row]?.includes(seatNumber.seat)) {
      seatColor.remove('seat-green');
      seatColor.add('seat-grey');
      props.userSeatsForMovie[seatNumber.row] = props.userSeatsForMovie[seatNumber.row].filter(seat => {
        return seat !== seatNumber.seat;
      });
      props.setUserSeatsForMovie(Object.fromEntries(Object.entries(props.userSeatsForMovie)));
      props.chosenSeats[seatNumber.row] = props.chosenSeats[seatNumber.row].filter(seat => {
        return seat !== seatNumber.seat;
      });
      props.setChosenSeats(() => Object.fromEntries(Object.entries(props.chosenSeats)));
    } else if (!props.chosenSeats[seatNumber.row]?.includes(seatNumber.seat)) {
      seatColor.remove('seat-grey');
      seatColor.add('seat-green');
      props.userSeatsForMovie[seatNumber.row] = [...(props.userSeatsForMovie[seatNumber.row] ?? []), seatNumber.seat];
      props.setUserSeatsForMovie(Object.fromEntries(Object.entries(props.userSeatsForMovie)));
      props.chosenSeats[seatNumber.row] = [...(props.chosenSeats[seatNumber.row] ?? []), seatNumber.seat];
      props.setChosenSeats(() => Object.fromEntries(Object.entries(props.chosenSeats)));
    }
  };

  return (
    <div className="column-seat">
      <div
        className={`seat seat-${seatNumber?.row + '-' + seatNumber?.seat} ${seatStatus}`}
        onClick={e => seatClickHandler(e)}
      >
        {props.seatNum?.seat ?? ''}
      </div>
    </div>
  );
};

export default Seat;
