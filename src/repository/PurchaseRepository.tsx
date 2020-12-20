import { Purchases } from '../DummyData';
import { ITEM_NOT_FOUND } from '../Messages';
import { MedicineBatch } from '../models/Batch';
import { MedicinePurchase } from '../models/MedicinePurchase';
import { BatchRepository } from './BatchRepository';

export class PurchaseRepository {
  private batchDB = new BatchRepository();

  //eslint-disable-next-line
  constructor() {}

  public getAll(): Promise<MedicinePurchase[]> {
    return new Promise((resolve, reject) => {
      resolve(Purchases as MedicinePurchase[]);
    });
  }

  public get(id: number): Promise<MedicinePurchase> {
    return new Promise(async (resolve, reject) => {
      let purchaseIndex = Purchases.findIndex((purchase: any) => !!(purchase.ID === id));
      if (purchaseIndex > -1) {
        let purchase = Purchases.find((purchase: any) => !!(purchase.ID === id));
        let batches = await this.batchDB.getBatches(id);
        purchase.Batch = batches || [];
        resolve(purchase);
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public search(query: string): Promise<MedicinePurchase[]> {
    return new Promise((resolve, reject) => {
      resolve([] as MedicinePurchase[]);
    });
  }

  public add(item: MedicinePurchase): Promise<MedicinePurchase> {
    return new Promise(async (resolve, reject) => {
      let index = Purchases.length ? Math.max(...Purchases.map((purchase: any) => purchase.ID)) + 1 : 1;
      item.ID = index;
      Purchases.push({ ...item });
      if (item.Batch?.length) {
        item.Batch.forEach((batch) => {
          batch.PurchaseID = index;
        });
        try {
          await this.batchDB.addMany([...item.Batch]);
          resolve(item);
        } catch (err) {
          reject(err);
        }
      }
    });
  }

  public update(item: MedicinePurchase): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let index = Purchases.findIndex((purchase: any) => !!(item.ID === purchase.ID));
      if (index > -1) {
        Purchases[index] = { ...item };
        try {
          let batches = await this.batchDB.getBatches(item.ID);
          if (batches.length) {
            batches.forEach(async (batch: MedicineBatch) => {
              var index = item.Batch?.findIndex((x) => x.ID === batch.ID);
              if (index === -1) {
                await this.batchDB.delete(batch.ID);
              } else {
                await this.batchDB.update(batch);
              }
            });

            await this.batchDB.addMany(item.Batch?.filter((batch) => !batch.ID) || []);
          }
          resolve(true);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = Purchases.findIndex((purchase: any) => !!(id === purchase.ID));
      if (index > -1) {
        Purchases.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
