import { ExpenseType } from '../models/ExpenseTypes';
import { ExpenseTypes } from '../DummyData';
import { ITEM_NOT_FOUND } from '../Messages';

export class ExpenseTypeRepository {
  constructor() {}

  public getAll(): Promise<ExpenseType[]> {
    return new Promise((resolve, reject) => {
      resolve([...ExpenseTypes] as ExpenseType[]);
    });
  }

  public getById(id: number): Promise<ExpenseType> {
    return new Promise((resolve, reject) => {
      resolve(ExpenseTypes.find((x: any) => x.ID === id) as ExpenseType);
    });
  }

  public search(query: string): Promise<ExpenseType[]> {
    return new Promise((resolve, reject) => {
      resolve(ExpenseTypes.filter((x: any) => !!(x.Name.indexof(query) > -1 || x.Description.indexOf(query) > -1)) as ExpenseType[]);
    });
  }

  public add(item: ExpenseType): Promise<ExpenseType> {
    return new Promise((resolve, reject) => {
      let index = Math.max(...ExpenseTypes.map((x: any) => x.ID)) + 1;
      item.ID = index;
      ExpenseTypes.push(item);
      resolve(item);
    });
  }

  public update(item: ExpenseType): Promise<ExpenseType> {
    return new Promise((resolve, reject) => {
      let index = ExpenseTypes.findIndex((x: any) => x.ID === item.ID);
      if (index > -1) {
        ExpenseTypes[index] = item;
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public delete(id: number): Promise<ExpenseType> {
    return new Promise((resolve, reject) => {
      let index = ExpenseTypes.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        ExpenseTypes.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
