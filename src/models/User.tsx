import { Interface } from 'readline';

export interface User {
  id?: number;
  username?: string;
  role?: string;
  Permissions?: string[];
}
