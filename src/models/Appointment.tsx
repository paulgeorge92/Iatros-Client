export interface Appointment {
  ID: number;
  Name?: string;
  Email?: string;
  Mobile?: string;
  Slot?: Date;
  message?: string;
  DoctorId?: number;
  Doctor?: string;
  Status: string;
  Notes?: string;
  InvoiceId?: number;
  PatientId?: number;
  DoctorNotes?: string;
}
