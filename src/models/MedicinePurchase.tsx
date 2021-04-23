import { MedicineBatch } from './Batch';
import { Supplier } from './Supplier';

export interface MedicinePurchase {
  ID: number;
  ReferenceID?: string;
  Supplier?: number;
  SupplierName?: string;
  SupplierAddress?: string;
  SupplierEmail?: string;
  SupplierPhone?: string;
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
