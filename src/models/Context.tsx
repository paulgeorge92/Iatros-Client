import { ContextActions } from '../constants';
import { User } from './User';

export interface AppContext {
  currentUser: User;
  settings: any;
}

export interface ContextProvider {
  context: AppContext;
  dispatch: any;
}
export interface ContextDispatch {
  type: ContextActions;
  value?: any;
}
