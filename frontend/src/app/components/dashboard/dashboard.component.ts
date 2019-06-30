import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { NoteData } from 'src/app/services/note-data.model';
import { NoteService } from 'src/app/services/note.service';

import { DeleteConfirmationBoxComponent } from 'src/app/shared/delete-confirmation-box/delete-confirmation-box.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  list = [1, 2, 'e2e2e2sfsf', 'wdwd', 34, 4534, 343, 3434, 43453, 4535];

  isLoading = false;
  noteData: NoteData[] = [];
  private noteDataSub: Subscription;

  constructor(private noteService: NoteService, public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.noteService.getNotes();
    this.noteDataSub = this.noteService
      .getNoteDataUpdatedListener()
      .subscribe((requestNotes: NoteData[]) => {
        this.noteData = requestNotes;
        this.isLoading = false;
        console.log(this.noteData);
      });
  }

  deleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationBoxComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this advertisement?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.noteService.deleteNote(id);
      }
    });
  }

  ngOnDestroy() {
    this.noteDataSub.unsubscribe();
  }

}
