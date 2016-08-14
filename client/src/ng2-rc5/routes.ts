import { Routes } from '@angular/router';
import { AppComponent } from './components/app/app';
import { HomeComponent } from './components/home/home';
import { CustomerComponent } from './components/customers/customers';

export const AppRoutes: Routes = [
  { path: "home", component: HomeComponent }
  , { path: "customers", component: CustomerComponent }
  , { path: "", redirectTo: "home", terminal: true }
];

export const ApplicationComponents = [ HomeComponent, CustomerComponent] ;