import { ReactNode } from 'react';

export interface MenuItem {
  name: string;
  path: string;
  index: number;
  subMenu?: Array<MenuItem>;
  icon?: React.ReactElement;
  showInMenu?: boolean;
  component?: ReactNode;
  showSubMenu?: Boolean;
}
