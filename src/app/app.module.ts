import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { QuillModule } from 'ngx-quill';

import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NoteComponent } from './components/note/note.component';
import { NoteEditorComponent } from './components/note/note-editor/note-editor.component';
import { NoteViewerComponent } from './components/note/note-viewer/note-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    NoteComponent,
    NoteEditorComponent,
    NoteViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    NoteViewerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
