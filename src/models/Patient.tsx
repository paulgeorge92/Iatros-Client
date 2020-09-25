import { MedicalHistory } from './MedicalHistory';
import { BloodGroup, Gender } from './Enums';

export interface Patient {
  ID: number;
  FirstName: string;
  LastName: string;
  MobileNumber: string;
  BloodGroup: BloodGroup;
  Email?: string;
  DateOfBirth: Date;
  Gender: Gender;
  AddressLine1: string;
  AddressLine2?: string;
  Town?: string;
  City: string;
  Country: string;
  ZipCode: string;
  MedicalHistory?: MedicalHistory;
  CreatedDate: Date;
  Status: 'Active' | 'Disabled' | 'Inactive';
}
