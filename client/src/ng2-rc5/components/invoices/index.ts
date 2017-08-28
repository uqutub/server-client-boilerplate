import {Component} from '@angular/core';
import Rx = require('rxjs');
import {List} from 'immutable';

import {InvoiceViewComponent as ViewComponent} from './view';
import {IInvoice} from '../../models/index';
import {InvoiceStore} from '../../stores/index';

@Component({
    selector: 'invoices'
    , template: `
    <h3>Invoices</h3>
    <hr/>
    <h5> <a [routerLink]="['add']">Add Invoice</a> </h5>
    <br />
    <view-invoice *ngFor="let invoice of invoices | async" [invoice]="invoice"></view-invoice>
`
    , directives: [ViewComponent]
})
export class IndexComponent {

    invoices: Rx.Observable<List<IInvoice>>;

    constructor(private store: InvoiceStore) {
        this.invoices = this.store.get();
    }
}