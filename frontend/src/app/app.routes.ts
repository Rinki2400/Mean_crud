import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users/users-form/users-form.component';

export const routes: Routes = [
    {
        path: '',
        component:UsersComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
     {
       path: 'users/add',
        component: UsersFormComponent
    }
];
