import { UserType } from './enum/UserType';
import { SelectedSeats } from './selectedSeats';

export type UserInfo = {
  userId: string;
  movieMarks: Record<string, number>;
  selectedSeats: SelectedSeats;
  role: UserType;
};
