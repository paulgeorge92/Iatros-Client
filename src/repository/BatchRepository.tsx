import { ITEM_NOT_FOUND } from '../Messages';
import { MedicineBatch } from '../models/Batch';

let Batches: MedicineBatch[] = [];

export class BatchRepository {
  //eslint-disable-next-line
  constructor() {}

  public getBatches(purchaseId: number): Promise<MedicineBatch[]> {
    return new Promise((resolve, reject) => {
      resolve([...Batches.filter((batch) => !!(batch.PurchaseID === purchaseId))]);
    });
  }

  public get(id: number): Promise<MedicineBatch> {
    return new Promise((resolve, reject) => {
      resolve(Batches.find((batch) => batch.ID === id));
    });
  }

  public add(batch: MedicineBatch): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var index = Batches.length;
      batch.ID = index;
      Batches.push(batch);
      resolve(true);
    });
  }

  public addMany(batches: MedicineBatch[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      batches.forEach((batch) => {
        batch.ID = Batches.length;
        Batches.push(batch);
      });
      resolve(true);
    });
  }

  public update(batch: MedicineBatch): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let index = Batches.findIndex((x) => x.ID === batch.ID);
      if (index > -1) {
        Batches[index] = batch;
        resolve(true);
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let index = Batches.findIndex((x) => x.ID === id);
      if (index > -1) {
        Batches.splice(index, 1);
        resolve(true);
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
