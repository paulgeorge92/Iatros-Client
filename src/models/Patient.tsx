import { MedicalHistory } from './MedicalHistory';
import { BloodGroup, Gender } from './Enums';

export interface Patient {
  ID: number;
  FirstName: string;
  LastName: string;
  MobileNumber: string;
  BloodGroup: string;
  Email: string;
  DateOfBirth: Date;
  Gender: string;
  AddressLine1: string;
  AddressLine2: string;
  Town: string;
  City: string;
  Country: string;
  ZipCode: string;
  MedicalHistory: MedicalHistory;
  CreatedDate: Date;
  Status: 'Active' | 'Disabled' | 'Inactive';
}
