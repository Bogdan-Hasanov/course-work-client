import React, { useEffect, useState } from 'react';
import './Seat/Seat.css';
import './SeatScheme.css';
import axios from 'axios';
import Seat from './Seat/Seat';
import { SeatsScheme } from '../../../../../../Models/SeatsScheme';
import { OccupiedPlaces } from '../../../../../../Models/OccupiedPlaces';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { getLoggedIn } from '../../../../../../store/selectors/authSelector';

function numberRange(length: number) {
  return Array(length)
    .fill(1)
    .map((x, y) => x + y);
}

interface SeatSchemeProps {
  schemeId: string;
  saveSession: (occupiedSeats: OccupiedPlaces) => void;
  occupiedPlaces: OccupiedPlaces;
  userSeatsForMovie: OccupiedPlaces | null;
  setUserSeatsForMovie: (occupiedSeats: OccupiedPlaces) => void;
}

const SeatScheme = (props: SeatSchemeProps) => {
  const [seatSchemes, setSeatSchemes] = useState<SeatsScheme>();
  const [chosenSeats, setChosenSeats] = useState<OccupiedPlaces>(props.occupiedPlaces);
  const [numberOfChosenSeats, setNumberOfChosenSeats] = useState(0);
  const isLoggedIn = useSelector(getLoggedIn);

  const generateSeatColor = (row: number, seatNumber: number) => {
    if (chosenSeats[row]?.includes(seatNumber)) {
      if (props.userSeatsForMovie?.[row]?.includes(seatNumber)) return 'seat-green';
      else return 'seat-black';
    } else return 'seat-grey';
  };

  const GenerateSeats = (seatNumbers: number[], index: number) => {
    return (
      <div className="row" key={index}>
        {seatNumbers.map(seatNumber => {
          return (
            <Seat
              seatNum={{ seat: seatNumber, row: index }}
              key={`${index}-${seatNumber}`}
              userSeatsForMovie={props.userSeatsForMovie}
              setUserSeatsForMovie={props.setUserSeatsForMovie}
              editable={isLoggedIn}
              chosenSeats={chosenSeats}
              setChosenSeats={setChosenSeats}
              seatColor={
                generateSeatColor(index, seatNumber)
                // chosenSeats[index] !== undefined
                //   ? chosenSeats[index].includes(seatNumber)
                //     ? 'seat-black'
                //     : 'seat-grey'
                //   : 'seat-grey'
              }
            />
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (!props.userSeatsForMovie) return;
    if (Object.keys(props.userSeatsForMovie).length)
      setNumberOfChosenSeats(
        Object.keys(props.userSeatsForMovie)
          .map(key => props.userSeatsForMovie?.[+key].length ?? 0)
          .reduce((previousValue, currentValue) => currentValue + previousValue),
      );
  }, [props.userSeatsForMovie]);

  useEffect(() => {
    axios.get<SeatsScheme>(`/Scheme/${props.schemeId}`).then(response => setSeatSchemes(response.data));
  }, []);

  const seatArrays = (rowLength: number[]) => {
    return rowLength.map(number => numberRange(number));
  };

  return (
    <div className="movie-complex">
      <p>Обрано місць {numberOfChosenSeats}</p>
      <p className={'screenParagraph'}>Екран</p>
      <div className="container row movie-layout">
        <div className="movie-column-1">
          {seatSchemes === undefined
            ? 'loading'
            : seatArrays(seatSchemes.seats).map((arr, index) => GenerateSeats(arr, index))}
        </div>
        <Button
          style={{ lineHeight: '20px', margin: '10px' }}
          variant="contained"
          color="primary"
          size="small"
          value="Login"
          onClick={() => props.saveSession(chosenSeats)}
        >
          Зберегти
        </Button>
      </div>
    </div>
  );
};

export default SeatScheme;
