import { Component } from '@angular/core';
// import {Observable} from 'rxjs';
import Rx = require('rxjs');
import {List} from 'immutable';

import {CustomerAddComponent} from './addCustomer/addCustomer';
import {CustomerViewComponent} from './viewCustomer/viewCustomer';

import {ICustomer} from '../../models/index';
import {CustomerStore} from '../../stores/index';

@Component({
  selector: 'customers'
  , templateUrl: 'ng2-rc5/components/customers/customers.html'
  , directives: [CustomerAddComponent, CustomerViewComponent]
  , providers: [CustomerStore]
})
export class CustomersComponent {

  customers: Rx.Observable<List<ICustomer>>;
  showNewPanel: boolean = false;

  constructor(private store: CustomerStore) {
    // console.log('Customerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    this.customers = this.store.get();
  }



}