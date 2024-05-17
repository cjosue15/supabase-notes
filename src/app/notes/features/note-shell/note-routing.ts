import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('../note-list/note-list.component'),
  },
  {
    path: '**',
    redirectTo: '',
  },
] as Routes;
