import { Role } from './Role';

export interface User {
  id?: number;
  userName?: string;
  name?: string;
  email?: string;
  status?: string;
  role?: Role;
}
