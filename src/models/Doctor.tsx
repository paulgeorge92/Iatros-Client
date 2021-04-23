import { Address } from './Address';
import { AppointmentInfo } from './AppointmentInfo';

export interface Doctor {
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  DOB: Date;
  Mobile: string;
  BloodGroup: string;
  Status: 'Active' | 'Inactive' | 'Disabled';
  Gender: string;
  userName: string;
  PhotoUrl?: string;
  Address?: Address;
  AppointmentInfo?: AppointmentInfo;
  Holidays?: Date[];
}
