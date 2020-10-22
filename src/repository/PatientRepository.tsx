import { Patient } from '../models/Patient';
import { Patients } from '../DummyData';
import { ITEM_NOT_FOUND } from '../Messages';
export class PatientRepository {
  constructor() {}
  public getAll(): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      resolve(Patients as Patient[]);
    });
  }
  public getByID(id: number): Promise<Patient> {
    return new Promise((resolve, reject) => {
      let index = Patients.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        resolve(Patients[index] as Patient);
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Patients.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        Patients.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public add(patient: Patient): Promise<Patient> {
    return new Promise((resolve, reject) => {
      try {
        let index = Math.max(...Patients.map((x: any) => x.ID)) + 1;
        patient.ID = index;
        Patients.push(patient);
        resolve(patient);
      } catch (error) {
        reject(error);
      }
    });
  }

  public update(patient: Patient): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        let index = Patients.findIndex((x: any) => x.ID === patient.ID);
        if (index > -1) {
          Patients[index] = patient;
          resolve();
        } else {
          reject(ITEM_NOT_FOUND);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
