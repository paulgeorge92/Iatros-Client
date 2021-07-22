import { ITEM_NOT_FOUND } from '../Messages';
import { Taxes } from '../DummyData';
import { Tax } from '../models/Tax';

export class TaxRepository {
  // eslint-disable-next-line
  constructor() {}

  public getAll(): Promise<Tax[]> {
    return new Promise((resolve, reject) => {
      resolve([...Taxes] as Tax[]);
    });
  }

  public getById(id: number): Promise<Tax> {
    return new Promise((resolve, reject) => {
      resolve(Taxes.find((x: any) => x.ID === id) as Tax);
    });
  }

  public search(query: string): Promise<Tax[]> {
    return new Promise((resolve, reject) => {
      resolve(Taxes.filter((x: any) => !!(x.Method.indexof(query) > -1)) as Tax[]);
    });
  }

  public add(item: Tax): Promise<Tax> {
    return new Promise((resolve, reject) => {
      let index = Math.max(...Taxes.map((x: any) => x.ID)) + 1;
      item.ID = index;
      Taxes.push(item);
      resolve(item);
    });
  }

  public update(item: Tax): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Taxes.findIndex((x: any) => x.ID === item.ID);
      if (index > -1) {
        Taxes[index] = item;
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Taxes.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        Taxes.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
