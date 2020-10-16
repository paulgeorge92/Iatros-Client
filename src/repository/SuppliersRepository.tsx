import { ITEM_NOT_FOUND } from '../Messages';
import { Suppliers } from '../DummyData';
import { Supplier } from '../models/Supplier';

export class SuppliersRepository {
  constructor() {}

  public getAll(): Promise<Supplier[]> {
    return new Promise((resolve, reject) => {
      resolve([...Suppliers] as Supplier[]);
    });
  }

  public getById(id: number): Promise<Supplier> {
    return new Promise((resolve, reject) => {
      resolve(Suppliers.find((x: any) => x.ID === id) as Supplier);
    });
  }

  public search(query: string): Promise<Supplier[]> {
    return new Promise((resolve, reject) => {
      resolve(Suppliers.filter((x: any) => !!(x.Method.indexof(query) > -1)) as Supplier[]);
    });
  }

  public add(item: Supplier): Promise<Supplier> {
    return new Promise((resolve, reject) => {
      let index = Math.max(...Suppliers.map((x: any) => x.ID)) + 1;
      item.ID = index;
      Suppliers.push(item);
      resolve(item);
    });
  }

  public update(item: Supplier): Promise<Supplier> {
    return new Promise((resolve, reject) => {
      let index = Suppliers.findIndex((x: any) => x.ID === item.ID);
      if (index > -1) {
        Suppliers[index] = item;
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public delete(id: number): Promise<Supplier> {
    return new Promise((resolve, reject) => {
      let index = Suppliers.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        Suppliers.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
