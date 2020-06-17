import {User} from "./user";
import {Categories} from "./categories";

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  date: Date;
  user: User;
  category: Categories;
}
