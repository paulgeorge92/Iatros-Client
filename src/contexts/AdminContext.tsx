import { createContext } from 'react';
import { APP_SETTINGS } from '../Defaults/AppSettings';
import { AppContext, ContextProvider } from '../models/Context';
let adminContext: AppContext = { session: {}, settings: APP_SETTINGS };
let contextProviderValue: ContextProvider = { context: adminContext, dispatch: null };

export const AdminContext = createContext(contextProviderValue);
