import { createContext } from 'react';
import { APP_SETTINGS } from '../constants/AppSettings';
import { AppContext, ContextProvider } from '../models/Context';
let context: AppContext = { currentUser: {}, settings: APP_SETTINGS };
let contextProviderValue: ContextProvider = { context, dispatch: null };
export const UserContext = createContext(contextProviderValue);
