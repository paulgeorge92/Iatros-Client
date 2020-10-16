import { Status } from './Enums';

export interface ExpenseType {
  ID: number;
  Name: string;
  Description: string;
  Status: Status;
}
