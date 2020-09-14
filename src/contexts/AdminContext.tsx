import { createContext } from 'react';
import { User } from '../models/User';
let adminContext: User = {};

export const AdminContext = createContext(adminContext);
