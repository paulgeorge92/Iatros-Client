import { ContextActions } from '../constants';
import { AppSettings } from './AppSettings';
import { Session } from './Session';

export interface AppContext {
  session: Session;
  settings: AppSettings;
}

export interface ContextProvider {
  context: AppContext;
  dispatch: any;
}
export interface ContextDispatch {
  type: ContextActions;
  value?: any;
}
