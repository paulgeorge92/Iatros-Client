import { createContext } from 'react';
import { User } from '../models/User';
let user: User = {};

export const UserContext = createContext(user);
