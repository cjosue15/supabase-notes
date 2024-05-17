import { AfterViewInit, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Note, NotesService } from '../../data-access/notes.service';
import { AuthService } from '../../../auth/data-access/auth.service';

interface NoteForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './note-list.component.html',
  styles: ``,
})
export default class NoteListComponent implements AfterViewInit {
  private _authService = inject(AuthService);

  private _router = inject(Router);

  private _formBuilder = inject(FormBuilder);

  notesService = inject(NotesService);

  noteSelected: Note | null = null;

  form = this._formBuilder.group<NoteForm>({
    title: this._formBuilder.control(null, Validators.required),
    description: this._formBuilder.control(null),
  });

  async logOut() {
    await this._authService.signOut();
    this._router.navigateByUrl('/auth/log-in');
  }

  ngAfterViewInit() {
    this.notesService.getAllNotes();
  }

  newNote() {
    if (this.form.invalid) return;

    if (this.noteSelected) {
      //editar
      this.notesService.updateNote({
        title: this.form.value.title ?? '',
        description: this.form.value.description!,
        id: this.noteSelected.id,
      });
    } else {
      this.notesService.insertNote({
        title: this.form.value.title ?? '',
        description: this.form.value.description!,
      });
    }

    this.form.reset();
    this.noteSelected = null;
  }

  editNote(note: Note) {
    this.noteSelected = note;

    this.form.setValue({
      title: this.noteSelected.title,
      description: this.noteSelected.description,
    });
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note.id);
  }
}
