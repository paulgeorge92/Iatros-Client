import { NoteType } from './Enums';

export interface ClinicalNote {
  ID: number;
  NoteType: NoteType;
  Note: string;
}
