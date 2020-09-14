import { createContext } from 'react';
import { User, AppContext } from '../models/User';
let user: User = {};

export const UserContext = createContext(user);
