import { Medicines } from '../DummyData';
import { ITEM_NOT_FOUND } from '../Messages';
import { Medicine } from '../models/Medicine';

export class MedicineRepository {
  // eslint-disable-next-line
  constructor() {}

  public getAll(): Promise<Medicine[]> {
    return new Promise((resolve, reject) => {
      resolve([...Medicines] as Medicine[]);
    });
  }
  public get(id: number): Promise<Medicine> {
    return new Promise((resolve, reject) => {
      resolve(Medicines.find((medicine: any) => !!(medicine.ID === id)) as Medicine);
    });
  }

  public search(query: string): Promise<Medicine[]> {
    return new Promise((resolve, reject) => {
      resolve(Medicines.filter((x: any) => !!(x.Name.indexof(query) > -1)) as Medicine[]);
    });
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Medicines.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        Medicines.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public add(item: Medicine): Promise<Medicine> {
    return new Promise((resolve, reject) => {
      //var indexes =
      let index = Math.max(...Medicines.map((medicine: any) => medicine.ID)) + 1;
      item.ID = index;
      item.CategoryName = item.CategoryName || '';
      Medicines.push({ ...item, CategoryName: item.CategoryName || '' });
      resolve(item);
    });
  }

  public update(item: Medicine): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Medicines.findIndex((x: any) => x.ID === item.ID);
      if (index > -1) {
        Medicines[index] = { ...item, CategoryName: item.CategoryName || '' };
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
