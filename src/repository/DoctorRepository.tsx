import { Doctor } from '../models/Doctor';
import { Doctors } from '../DummyData';
import { ITEM_NOT_FOUND } from '../Messages';
export class DoctorRepository {
  // eslint-disable-next-line
  constructor() {}

  public getAll(): Promise<Doctor[]> {
    return new Promise((resolve, reject) => {
      resolve([...Doctors] as Doctor[]);
    });
  }

  public getById(id: number): Promise<Doctor> {
    return new Promise((resolve, reject) => {
      resolve(Doctors.find((x: any) => x.ID === id) as Doctor);
    });
  }

  public search(query: string): Promise<Doctor[]> {
    query = query.toLowerCase();
    return new Promise((resolve, reject) => {
      resolve(Doctors.filter((x: any) => !!(x.FirstName.toLowerCase().indexof(query) > -1 || x.LastName.toLowerCase().indexOf(query) > -1)) as Doctor[]);
    });
  }

  public add(item: Doctor): Promise<Doctor> {
    return new Promise((resolve, reject) => {
      let index = Math.max(...Doctors.map((catgory: any) => catgory.ID)) + 1;
      item.ID = index;
      Doctors.push(item);
      resolve(item);
    });
  }

  public update(item: Doctor): Promise<Doctor> {
    return new Promise((resolve, reject) => {
      let index = Doctors.findIndex((x: any) => x.ID === item.ID);
      if (index > -1) {
        Doctors[index] = item;
        resolve(item);
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Doctors.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        Doctors.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
