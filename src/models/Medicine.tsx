export interface Medicine {
  ID: number;
  Name: string;
  CategoryID: number;
  CategoryName?: string;
  Company: string;
  Genreic: string;
  Group: string;
  Unit: string;
  UnitPerPacking: number;
  StroeBox: string;
  MinLevel: number;
  ReOrderLevel: number;
  Note: string;
}
