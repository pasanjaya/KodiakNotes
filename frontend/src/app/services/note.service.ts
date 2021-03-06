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
  private userId: number;
  private noteData: NoteData[] = [];
  private noteDataUpdated = new Subject<NoteData[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token) {
      return;
    }
    this.userId = +userId;
  }

  saveNotes(title: string, note: string) {
    this.getAuthData();
    const noteData = {
      title,
      content: note
    };

    this.http
      .post<{
        id: number;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
      }>('http://localhost:8080/notes/' + this.userId, noteData)
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
    this.getAuthData();
    console.log('myId' + this.userId);
    this.http
      .get<{ content: any; pageable: any }>(
        'http://localhost:8080/notes/' + this.userId
      )
      .pipe(
        map(noteData => {
          // console.log(noteData);
          return noteData.content.map(noteDataCollection => {
            return {
              id: noteDataCollection.id,
              title: noteDataCollection.title,
              note: noteDataCollection.content,
              createdAt: noteDataCollection.createdAt,
              updatedAt: noteDataCollection.updatedAt
            };
          });
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
    this.getAuthData();
    return this.http.get<{
      id: number;
      title: string;
      content: string;
      createdAt: Date;
      updatedAt: Date;
    }>('http://localhost:8080/notes/' + this.userId + '/note/' + id);

  }

  updateNote(id: number, title: string, note: string) {
    this.getAuthData();
    const noteData = {
      id,
      title,
      content: note
    };
    console.log(noteData);
    this.http
      .put(
        'http://localhost:8080/notes/' + this.userId + '/note/' + id,
        noteData
      )
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
    this.getAuthData();
    this.http
      .delete('http://localhost:8080/notes/' + this.userId + '/note/' + id)
      .subscribe(() => {
        console.log('deleted');
        const updatedNotes = this.noteData.filter(note => note.id !== id);
        this.noteData = updatedNotes;
        this.noteDataUpdated.next([...this.noteData]);
      });
  }
}
