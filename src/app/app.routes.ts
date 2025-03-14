import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddWindowComponent} from './add-window/add-window.component';
import {EditWindowComponent} from './edit-window/edit-window.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirect base path to home
  { path: 'home', component: HomeComponent }, // Home page component
  { path: 'add-address', component: AddWindowComponent }, // New route for AddWindowComponent
    {path:'edit-address/:id', component:EditWindowComponent} // New route for EditWindowComponent
];
