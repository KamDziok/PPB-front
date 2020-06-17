import {User} from "./user";
import {Advertisement} from "./advertisement";

export interface Massage {
  id: number;
  date: Date;
  contents: string;
  sender: User;
  recipient: User;
  advertisement: Advertisement;
}
