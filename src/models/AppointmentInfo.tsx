export interface AppointmentInfo {
  Monday: DaySlots;
  Tuesday: DaySlots;
  Wednesday: DaySlots;
  Thursday: DaySlots;
  Friday: DaySlots;
  Saturday: DaySlots;
  Sunday: DaySlots;
}

interface Slot {
  StartTime: Date;
  EndTime: Date;
}

interface DaySlots {
  Morning?: Slot;
  Afternoon?: Slot;
  SlotDuration?: number;
  IsHoliday: boolean;
}
