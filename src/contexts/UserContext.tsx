import { createContext } from 'react';
import { AppContext, ContextProvider } from '../models/Context';
let context: AppContext = { currentUser: {}, settings: {} };
let contextProviderValue: ContextProvider = { context, dispatch: null };
export const UserContext = createContext(contextProviderValue);
