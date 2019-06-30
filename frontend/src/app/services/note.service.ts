import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { NoteData } from '../services/note-data.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private noteData: NoteData[] = [];
  private noteDataUpdated = new Subject<NoteData[]>();

  constructor(private http: HttpClient, private router: Router) { }

  saveNotes(title: string, note: string) {
    const noteData = {
      title,
      content: note
    };

    this.http
      .post<{ id: number; title: string, content: string, createdAt: Date, updatedAt: Date }>(
        'http://localhost:8080/notes/2',
        noteData
      )
      .subscribe(response => {
        console.log(response);
        const messageRequest: NoteData = {
          id: response.id,
          title: response.title,
          note: response.content,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt
        };
        this.noteData.push(messageRequest);
        this.noteDataUpdated.next([...this.noteData]);
        this.router.navigate(['/dashboard']);
      });
  }

  getNotes() {
    this.http
      .get<{ content: any; pageable: any }>(
        'http://localhost:8080/notes/2'
      )
      .pipe(
        map(noteData => {
          // console.log(noteData);
          return noteData.content.map(
            noteDataCollection => {
              return {
                id: noteDataCollection.id,
                title: noteDataCollection.title,
                note: noteDataCollection.content,
                createdAt: noteDataCollection.createdAt,
                updatedAt: noteDataCollection.updatedAt
              };
            }
          );
        })
      )
      .subscribe(transformedData => {
        this.noteData = transformedData;
        this.noteDataUpdated.next([...this.noteData]);
      });
  }

  getNoteDataUpdatedListener() {
    return this.noteDataUpdated.asObservable();
  }

  getNoteEdit(id: number) {
    return {...this.noteData.find(note => note.id === id) };
  }

  updateNote(id: number, title: string, note: string) {
    const noteData = {
        id,
        title,
        content: note
      };
    console.log(noteData);
    this.http.put('http://localhost:8080/notes/2/note/' + id, noteData)
    .subscribe(response => {
      console.log(response);
      const updatedNote = [...this.noteData];
      const oldAdvIndex = updatedNote.findIndex(n => n.id === id);
      const notes: NoteData = {
        id,
        title,
        note
      };
      updatedNote[oldAdvIndex] = notes;
      this.noteData = updatedNote;
      this.noteDataUpdated.next([...this.noteData]);
      this.router.navigate(['/dashboard']);
    });
  }

  deleteNote(id: number) {
    this.http.delete('http://localhost:8080/notes/2/note/' + id)
    .subscribe(() => {
      console.log('deleted');
      const updatedNotes = this.noteData.filter(note => note.id !== id);
      this.noteData = updatedNotes;
      this.noteDataUpdated.next([...this.noteData]);
    });
  }
}
