import { Interface } from 'readline';

export interface User {
  id?: number;
  username?: string;
  role?: string;
}

export interface AppContext {
  user: User;
  selectedMenu: Array<String>;
}
