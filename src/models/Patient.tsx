import { Gender, Status } from './Enums';
import { MedicalHistory } from './MedicalHistory';

export interface Patient {
  ID: number;
  FirstName: string;
  LastName: string;
  MobileNumber: string;
  BloodGroup: string;
  Email?: string;
  DateOfBirth: Date;
  Gender: Gender;
  AddressLine1: string;
  AddressLine2?: string;
  City: string;
  Country: string;
  ZipCode: string;
  MedicalHistory?: MedicalHistory;
  CreatedDate: Date;
  Status: Status;
}
