import { ContextActions } from '../constants';
import { AppSettings } from './AppSettings';
import { User } from './User';

export interface AppContext {
  currentUser: User;
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
