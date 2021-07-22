import { Role } from './Role';
import { User } from './User';

export interface Session {
  id?: number;
  username?: string;
  sessionKey?: string;
  role?: Role;
}
