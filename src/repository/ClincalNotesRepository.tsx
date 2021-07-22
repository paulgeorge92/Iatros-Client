import { ClinicalNote } from '../models/ClinicalNote';
import { ClinicalNotes } from '../DummyData';
import { ITEM_NOT_FOUND } from '../Messages';
export class ClinicalNotesRepository {
  // eslint-disable-next-line
  constructor() {}

  public getAll(): Promise<ClinicalNote[]> {
    return new Promise((resolve, reject) => {
      resolve([...ClinicalNotes] as ClinicalNote[]);
    });
  }

  public getById(id: number): Promise<ClinicalNote> {
    return new Promise((resolve, reject) => {
      resolve(ClinicalNotes.find((x: any) => x.ID === id) as ClinicalNote);
    });
  }

  public getByType(type: string): Promise<ClinicalNote[]> {
    return new Promise((resolve, reject) => {
      resolve(ClinicalNotes.filter((x: any) => x.NoteType === type) as ClinicalNote[]);
    });
  }

  public search(query: string): Promise<ClinicalNote[]> {
    return new Promise((resolve, reject) => {
      resolve(ClinicalNotes.filter((x: any) => !!(x.NoteType.indexof(query) > -1 || x.Note.indexOf(query) > -1)) as ClinicalNote[]);
    });
  }

  public add(item: ClinicalNote): Promise<ClinicalNote> {
    return new Promise((resolve, reject) => {
      let index = Math.max(...ClinicalNotes.map((catgory: any) => catgory.ID)) + 1;
      item.ID = index;
      ClinicalNotes.push(item);
      resolve(item);
    });
  }

  public update(item: ClinicalNote): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = ClinicalNotes.findIndex((x: any) => x.ID === item.ID);
      if (index > -1) {
        ClinicalNotes[index] = item;
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let index = ClinicalNotes.findIndex((x: any) => x.ID === id);
      if (index > -1) {
        ClinicalNotes.splice(index, 1);
        resolve();
      } else {
        reject(ITEM_NOT_FOUND);
      }
    });
  }
}
