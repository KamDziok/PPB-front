import {Advertisement} from './advertisement';
import {User} from './user';

export interface Comment {
  id: number;
  date: Date;
  contents: string;
  advertisement: Advertisement;
  user: User;
}
