import { Routes } from '@angular/router';

// import { AppComponent } from './components/app/app';
import { HomeComponent } from './components/home/home';
import { CustomersComponent } from './components/customers/customers';
import { ProductComponent } from './components/products/products';
import { IndexComponent } from './components/invoices/index';

export const AppRoutes: Routes = [
  { path: "home", component: HomeComponent }
  , { path: "customers", component: CustomersComponent }
  , { path: "products", component: ProductComponent }
  , { path: "invoices", children: [
    , { path: "add", component: IndexComponent }
    , { path: "edit/:id", component: IndexComponent }
    , { path: "delete/:id", component: IndexComponent }
    , { path: "", component: IndexComponent }
  ]}
  , { path: "", redirectTo: "home", terminal: true }
];

export const ApplicationComponents = [ HomeComponent, CustomersComponent, ProductComponent] ;