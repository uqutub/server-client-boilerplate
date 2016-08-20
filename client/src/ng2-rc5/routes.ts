import { Routes } from '@angular/router';

// import { AppComponent } from './components/app/app';
import { HomeComponent } from './components/home/home';
import { CustomersComponent } from './components/customers/customers';
import { ProductComponent } from './components/products/products';

export const AppRoutes: Routes = [
  { path: "home", component: HomeComponent }
  , { path: "customers", component: CustomersComponent }
  , { path: "products", component: ProductComponent }
  , { path: "", redirectTo: "home", terminal: true }
];

export const ApplicationComponents = [ HomeComponent, CustomersComponent, ProductComponent] ;