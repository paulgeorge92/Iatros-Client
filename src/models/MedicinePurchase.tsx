import { MedicineBatch } from './Batch';
import { Supplier } from './Supplier';

export interface MedicinePurchase {
  ID: number;
  Supplier?: number;
  SupplierName?: string;
  PurchaseDate?: Date;
  Total: number;
  TaxAmount: number;
  DiscountType: string;
  DiscountAmount: number;
  Amount: number;
  Note?: string;
  CreatedBy?: number;
  Created?: Date;
  Modified?: Date;
  ModifiedBy?: number;
  Batch: MedicineBatch[];
}
