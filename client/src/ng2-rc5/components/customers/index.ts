import { Component } from '@angular/core';
// import {Observable} from 'rxjs';
import Rx = require('rxjs');
import {List} from 'immutable';

import {CustomerViewComponent as ViewComponent} from './view';

import {ICustomer} from '../../models/index';
import {CustomerStore} from '../../stores/index';

@Component({
  selector: 'customers'
  , template: `
    <h3>Customers</h3>
    <hr/>
    <h5 [routerLink]="['add']"><a>Add Customer</a></h5>
    <br />
    <view-customer *ngFor="let customer of customers | async" [customer]="customer"></view-customer>
  `
  , directives: [ViewComponent]
})
export class IndexComponent {

  customers: Rx.Observable<List<ICustomer>>;

  constructor(private store: CustomerStore) {
    this.customers = this.store.get();
  }



}