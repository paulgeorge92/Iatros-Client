export interface MedicineBatch {
  ID: number;
  Name?: string;
  Batch?: string;
  Expiry?: Date;
  PackageQuantity?: number;
  Quantity?: number;
  SalePrice?: number;
  PurchasePrice?: number;
  TaxID?: number;
  TaxPrice?: number;
  Price?: number;
  Sold?: number;
  MedicineID?: number;
  PurchaseID?: number;
  Status?: boolean;
  CreatedBy?: number;
  Created?: Date;
  Modified?: Date;
  ModifiedBy?: number;
}
