import { Component } from '@angular/core';
// import {Observable} from 'rxjs';
import Rx = require('rxjs');
import {List} from 'immutable';

import {AddCustomer} from './addCustomer/addCustomer';

import {ICustomer} from '../../models/index';
import {CustomerStore} from '../../stores/index';

@Component({
  selector: 'customers'
  , templateUrl: 'ng2-rc5/components/customers/customers.html'
  , directives: [AddCustomer]
  , providers: [CustomerStore]
})
export class CustomerComponent {

  customers: Rx.Observable<List<ICustomer>>;

  constructor(private store: CustomerStore) {
    // console.log('Customerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    this.customers = this.store.get();
  }



}