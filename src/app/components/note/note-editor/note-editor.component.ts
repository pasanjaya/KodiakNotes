import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {

  editorForm: FormGroup;
  constructor() { }

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

}
