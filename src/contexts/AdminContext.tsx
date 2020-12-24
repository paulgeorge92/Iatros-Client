import { createContext } from 'react';
import { AppContext, ContextProvider } from '../models/Context';
let adminContext: AppContext = { currentUser: {}, settings: {} };
let contextProviderValue: ContextProvider = { context: adminContext, dispatch: null };

export const AdminContext = createContext(contextProviderValue);
