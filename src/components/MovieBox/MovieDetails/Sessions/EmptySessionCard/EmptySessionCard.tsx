import './EmptySession.css';
import { IconButton, MenuItem, Select, TextField } from '@material-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { AddBox } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import ukLocale from 'date-fns/locale/uk';
import { SeatsScheme } from '../../../../../Models/SeatsScheme';
import axios from 'axios';
import { MovieSession } from '../../../../../Models/MovieSession';

interface EmptySessionProps {
  movieId: string;
  fetchMovieSessions: () => void;
}

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const EmptySessionCard = (props: EmptySessionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [allSchemes, setAllSchemes] = useState<SeatsScheme[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<SeatsScheme | null>(null);

  useEffect(() => {
    axios.get<SeatsScheme[]>('Scheme').then(result => {
      setAllSchemes(result.data);
      setSelectedScheme(result.data[0]);
    });
  }, []);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    const selectedScheme = allSchemes.find(scheme => scheme.id === (event.target.value as string));
    if (selectedScheme) {
      setSelectedScheme(selectedScheme);
    }
  };

  const handleClick = async () => {
    if (!selectedScheme || !selectedDate) return;
    const movieSession: MovieSession = {
      id: '',
      endDate: null,
      movieId: props.movieId,
      occupiedPlaces: {},
      schemeId: selectedScheme.id,
      startDate: selectedDate,
    };
    if (selectedScheme) {
      await axios.post('Session', movieSession);
      props.fetchMovieSessions();
    }
  };
  return (
    <div className={'EmptySessionCard'}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ukLocale}>
        <DateTimePicker
          style={{
            margin: '4px 8px',
          }}
          ampm={false}
          label="Дата сеансу"
          format={'EE-yyyy/MM/dd hh:mm'}
          value={selectedDate}
          onChange={newValue => {
            setSelectedDate(newValue);
          }}
        />
      </MuiPickersUtilsProvider>
      {allSchemes.length ? (
        <Select
          labelId="scheme-select-label"
          id="select-label"
          value={selectedScheme?.id ?? allSchemes[0].id ?? ''}
          onChange={handleChange}
        >
          {allSchemes.length
            ? allSchemes.map(scheme => (
                <MenuItem key={scheme.id} value={scheme.id}>
                  {scheme.name}
                </MenuItem>
              ))
            : null}
        </Select>
      ) : null}
      {allSchemes.length ? (
        <IconButton
          className="svg_icons"
          color="primary"
          aria-label="add session"
          component="span"
          size={'medium'}
          onClick={handleClick}
        >
          <AddBox />
        </IconButton>
      ) : null}
    </div>
  );
};
export default EmptySessionCard;
