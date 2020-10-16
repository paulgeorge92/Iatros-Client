import { Patient } from '../models/Patient';
import { Patients } from '../DummyData';
export class PatientRepository {
  constructor() {}
  public getAllPatients(): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      resolve(Patients as Patient[]);
    });
  }
  public getPatient(id: number): Promise<Patient | null> {
    return new Promise((resolve, reject) => {
      resolve(Patients.find((patient: any) => !!(patient.ID === id)) as Patient | null);
    });
  }
}
