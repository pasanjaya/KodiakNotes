import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { NoteViewerComponent } from '../note-viewer/note-viewer.component';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {

  editorForm: FormGroup;

  constructor( public dialog: MatDialog ) { }

  editorStyle = {
    height: '300px',
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
      editor: new FormControl(null)
    });
  }

  onSave() {
    console.log(this.editorForm.get('editor').value);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NoteViewerComponent, {
      width: '350px',
      data: this.editorForm.get('editor').value
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Yes clicked');
    //   }
    // });
  }

}
