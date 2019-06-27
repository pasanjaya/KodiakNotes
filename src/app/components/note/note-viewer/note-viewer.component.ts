import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-note-viewer',
  templateUrl: './note-viewer.component.html',
  styleUrls: ['./note-viewer.component.scss']
})
export class NoteViewerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoteViewerComponent>,
              @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {
  }

  onOkayClick(): void {
    this.dialogRef.close();
  }

}
