import { Appointments } from '../DummyData';
import { ITEM_NOT_FOUND } from '../Messages';
import { Appointment } from '../models/Appointment';
export class AppointmentsRepository {
  // eslint-disable-next-line
  constructor() {}

  public getAll(): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      resolve([...Appointments] as Appointment[]);
    });
  }

  public getById(id: number): Promise<Appointment> {
    return new Promise((resolve, reject) => {
      resolve(Appointments.find((x: any) => x.ID === id) as Appointment);
    });
  }

  public getByStatus(status: string): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      resolve(Appointments.filter((x: any) => x.Status === status) as Appointment[]);
    });
  }

  public search(query: string): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      resolve(Appointments.filter((x: any) => !!(x.NoteType.indexof(query) > -1 || x.Note.indexOf(query) > -1)) as Appointment[]);
    });
  }

  public add(item: Appointment): Promise<Appointment> {
    return new Promise((resolve, reject) => {
      let index = Math.max(...Appointments.map((catgory: any) => catgory.ID)) + 1;
      item.ID = index;
      Appointments.push(item);
      resolve(item);
    });
  }

  public update(item: Appointment): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Appointments.findIndex((x: any) => x.ID === item.ID);
      if (index > -1) {
        Appointments[index] = item;
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Appointments.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        Appointments.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
