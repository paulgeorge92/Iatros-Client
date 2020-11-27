import { ITEM_NOT_FOUND } from '../Messages';
import PaymentMethod from '../models/PaymentMethod';
import { PaymentMethods } from '../DummyData';

export class PaymentMethodRepository {
  // eslint-disable-next-line
  constructor() {}

  public getAll(): Promise<PaymentMethod[]> {
    return new Promise((resolve, reject) => {
      resolve([...PaymentMethods] as PaymentMethod[]);
    });
  }

  public getById(id: number): Promise<PaymentMethod> {
    return new Promise((resolve, reject) => {
      resolve(PaymentMethods.find((x: any) => x.ID === id) as PaymentMethod);
    });
  }

  public search(query: string): Promise<PaymentMethod[]> {
    return new Promise((resolve, reject) => {
      resolve(PaymentMethods.filter((x: any) => !!(x.Method.indexof(query) > -1)) as PaymentMethod[]);
    });
  }

  public add(item: PaymentMethod): Promise<PaymentMethod> {
    return new Promise((resolve, reject) => {
      let index = Math.max(...PaymentMethods.map((x: any) => x.ID)) + 1;
      item.ID = index;
      PaymentMethods.push(item);
      resolve(item);
    });
  }

  public update(item: PaymentMethod): Promise<PaymentMethod> {
    return new Promise((resolve, reject) => {
      let index = PaymentMethods.findIndex((x: any) => x.ID === item.ID);
      if (index > -1) {
        PaymentMethods[index] = item;
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public delete(id: number): Promise<PaymentMethod> {
    return new Promise((resolve, reject) => {
      let index = PaymentMethods.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        PaymentMethods.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
