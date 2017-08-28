import { Routes } from '@angular/router';

// import { AppComponent } from './components/app/app';
import { HomeComponent } from './components/home/home';

// customer module
import { IndexComponent as CustomersComponent } from './components/customers/index';
import { AddComponent as AddCustomerComponent } from './components/customers/add';
import { UpdateComponent as UpdateCustomerComponent } from './components/customers/update';
import { DeleteComponent as DeleteCustomerComponent } from './components/customers/delete';

// product module
import { IndexComponent as ProductsComponent } from './components/products/index';
import { AddComponent as AddProductComponent } from './components/products/add';
import { UpdateComponent as UpdateProductComponent } from './components/products/update';
import { DeleteComponent as DeleteProductComponent } from './components/products/delete';

// invoice module
import { IndexComponent as InvoicesComponent } from './components/invoices/index';
import { AddComponent as AddInvoiceComponent } from './components/invoices/add';
import { UpdateComponent as UpdateInvoiceComponent } from './components/invoices/update';
import { DeleteComponent as DeleteInvoiceComponent } from './components/invoices/delete';

// ledger module
import { IndexComponent as LedgersComponent } from './components/customersLedger/index';
import { AddComponent as AddLedgerComponent } from './components/customersLedger/add';
// import { UpdateComponent as UpdateLedgerComponent } from './components/customersLedger/update';
// import { DeleteComponent as DeleteLedgerComponent } from './components/customersLedger/delete';

export const AppRoutes: Routes = [
  { path: "home", component: HomeComponent }
  , {
    path: "cust"
    , children: [
      { path: "add", component: AddCustomerComponent }
      , { path: "edit/:id", component: UpdateCustomerComponent }
      , { path: "delete/:id", component: DeleteCustomerComponent }
      , { path: "", component: CustomersComponent }
    ]
  }
  , {
    path: "prod"
    , children: [
      { path: "add", component: AddProductComponent }
      , { path: "edit/:id", component: UpdateProductComponent }
      , { path: "delete/:id", component: DeleteProductComponent }
      , { path: "", component: ProductsComponent }
    ]
  }
  , {
    path: "inv"
    , children: [
      { path: "add", component: AddInvoiceComponent }
      , { path: "edit/:id", component: UpdateInvoiceComponent }
      , { path: "delete/:id", component: DeleteInvoiceComponent }
      , { path: "", component: InvoicesComponent }
    ]
  }
  , {
    path: "cust-ledger"
    , children: [
      { path: "add", component: AddLedgerComponent }
      // , { path: "edit/:id", component: UpdateLedgerComponent }
      // , { path: "delete/:id", component: DeleteLedgerComponent }
      , { path: "", component: LedgersComponent }
    ]
  }
  , { path: "", redirectTo: "home", terminal: true }
];

export const ApplicationComponents = [

  HomeComponent

  // customer modules
  , CustomersComponent
  , AddCustomerComponent
  , UpdateCustomerComponent
  , DeleteCustomerComponent

  // product modules
  , ProductsComponent
  , AddProductComponent
  , UpdateProductComponent
  , DeleteProductComponent

  // invoice modules
  , InvoicesComponent
  , AddInvoiceComponent
  , UpdateInvoiceComponent
  , DeleteInvoiceComponent

  // customer ledger moduls
  , LedgersComponent
  , AddLedgerComponent
  , UpdateLedgerComponent
  , DeleteLedgerComponent

];