import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { QuillModule } from 'ngx-quill';

import { ErrorInterceptor } from './error-interceptor';

import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NoteComponent } from './components/note/note.component';
import { NoteEditorComponent } from './components/note/note-editor/note-editor.component';
import { NoteViewerComponent } from './components/note/note-viewer/note-viewer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeleteConfirmationBoxComponent } from './shared/delete-confirmation-box/delete-confirmation-box.component';
import { ErrorComponent } from './shared/errors/errors.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    NoteComponent,
    NoteEditorComponent,
    NoteViewerComponent,
    NavbarComponent,
    DashboardComponent,
    DeleteConfirmationBoxComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSnackBarModule
  ],
  entryComponents: [
    NoteViewerComponent,
    DeleteConfirmationBoxComponent,
    ErrorComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
