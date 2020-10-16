import { MedicineCategory } from '../models/MedicineCategory';
import { Categories } from '../DummyData';
import { rejects } from 'assert';
import { ITEM_NOT_FOUND } from '../Messages';

export class MedicineCategoryRepository {
  constructor() {}

  public getAll(): Promise<MedicineCategory[]> {
    return new Promise((resolve, reject) => {
      resolve([...Categories] as MedicineCategory[]);
    });
  }
  public get(id: number): Promise<MedicineCategory> {
    return new Promise((resolve, reject) => {
      resolve(Categories.find((catrgory: any) => !!(catrgory.ID === id)) as MedicineCategory);
    });
  }

  public search(query: string): Promise<MedicineCategory[]> {
    return new Promise((resolve, reject) => {
      resolve(Categories.filter((x: any) => !!(x.Name.indexof(query) > -1)) as MedicineCategory[]);
    });
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Categories.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        Categories.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public add(item: MedicineCategory): Promise<MedicineCategory> {
    return new Promise((resolve, reject) => {
      //var indexes =
      let index = Math.max(...Categories.map((catgory: any) => catgory.ID)) + 1;
      item.ID = index;
      Categories.push(item);
      resolve(item);
    });
  }

  public update(item: MedicineCategory): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Categories.findIndex((x: any) => x.ID === item.ID);
      if (index > -1) {
        Categories[index] = item;
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
