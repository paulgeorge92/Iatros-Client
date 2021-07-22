import { createContext } from 'react';
import { APP_SETTINGS } from '../Defaults/AppSettings';
import { AppContext, ContextProvider } from '../models/Context';
let context: AppContext = { session: {}, settings: APP_SETTINGS };
let contextProviderValue: ContextProvider = { context, dispatch: null };
export const UserContext = createContext(contextProviderValue);
