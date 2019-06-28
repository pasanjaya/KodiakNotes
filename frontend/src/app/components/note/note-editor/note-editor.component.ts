import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { NoteViewerComponent } from '../note-viewer/note-viewer.component';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {

  constructor( public dialog: MatDialog ) { }

  editorForm: FormGroup;

  editorStyle = {
    height: '400px',
    backgroundColor: '#fff'
  };

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      ['code-block'],
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean']
    ]
  };

  ngOnInit() {
    this.editorForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      note: new FormControl(null, Validators.required)
    });
  }

  onSave() {
    console.log(this.editorForm.get('note').value);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NoteViewerComponent, {
      width: '350px',
      data: {
        title: this.editorForm.get('title').value,
        note: this.editorForm.get('note').value
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Yes clicked');
    //   }
    // });
  }

}
