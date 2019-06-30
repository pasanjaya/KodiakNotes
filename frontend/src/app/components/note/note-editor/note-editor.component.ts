import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { NoteViewerComponent } from '../note-viewer/note-viewer.component';

import { NoteService } from '../../../services/note.service';
import { NoteData } from 'src/app/services/note-data.model';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {

  isLoading = false;
  public isEditMode = false;
  private noteId: number;
  private note: NoteData;

  constructor( public dialog: MatDialog, private noteService: NoteService, public route: ActivatedRoute ) { }

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
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ align: [] }],
      ['clean']
    ]
  };

  ngOnInit() {

    this.editorForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      note: new FormControl(null, Validators.required)
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isEditMode = true;
        this.noteId = +paramMap.get('id');
        this.note = this.noteService.getNoteEdit(this.noteId);
        this.setEditerForm();
        console.log(this.note);
        console.log(this.noteId);
      } else {
        this.isEditMode = false;
        this.noteId = null;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NoteViewerComponent, {
      width: '350px',
      data: {
        title: this.editorForm.get('title').value,
        note: this.editorForm.get('note').value
      }
    });
  }

  setEditerForm() {
    this.editorForm.setValue({
      title: this.note.title,
      note: this.note.note
    });
  }

  onSave() {
    console.log(this.editorForm);
    if (this.editorForm.invalid) {
      console.log('form invalid');
      return;
    }
    if (!this.isEditMode) {
      this.noteService.saveNotes(this.editorForm.get('title').value, this.editorForm.get('note').value);
    } else {
      this.noteService.updateNote(this.noteId, this.editorForm.get('title').value, this.editorForm.get('note').value);
    }
  }


}
