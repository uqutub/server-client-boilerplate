import { Component } from '@angular/core';
// import {Observable} from 'rxjs';
import Rx = require('rxjs');
import {List} from 'immutable';

import {CustomerStore, ICustomer} from '../../stores/index';

@Component({
  selector: 'customers'
  , templateUrl: 'ng2-rc5/components/customers/customers.html'
  , providers: [CustomerStore]
})
export class CustomerComponent {

  customers: Rx.Observable<List<ICustomer>>;

  constructor(private stor: CustomerStore) {
    console.log('Customerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    // this.customers = this.store.get();
  }



}