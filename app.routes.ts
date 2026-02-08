import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/employee-list/employee-list.component').then(m => m.EmployeeListComponent)
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/employee-form/employee-form.component').then(m => m.EmployeeFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/employee-form/employee-form.component').then(m => m.EmployeeFormComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
