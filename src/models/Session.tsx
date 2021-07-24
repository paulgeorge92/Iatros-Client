import { Role } from './Role';

export interface Session {
  ID?: number;
  UserName?: string;
  SessionKey?: string;
  Role?: Role;
  UserID?: number;
}
