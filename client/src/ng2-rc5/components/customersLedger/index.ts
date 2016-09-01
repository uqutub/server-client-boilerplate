import {Component} from '@angular/core';
import Rx = require('rxjs');
import {List} from 'immutable';


import {LedgerViewComponent as ViewComponent} from './view';
import {ILedger} from '../../models/index';
import {CustomerLedgerStore} from '../../stores/index';
import {OrderBy} from '../../pipes/index';

@Component({
    selector: 'ledgers'
    , template: `
    <h3>Customer Ledgers</h3>
    <hr/>
    <h5 [routerLink]="['add']"><a>Add Ledger</a></h5>
    <br />
    <!-- <view-ledger *ngFor="let ledger of ledgers | async" [ledger]="ledger"></view-ledger> -->
    <table class="table table-stripped table-responsive">
        <tr>
            <td>Customer</td>
            <td>Remarks---</td>
            <td>Credit</td>
            <td>Debit</td>
        </tr>
        <tr *ngFor="let ledger of ledgers | async | orderBy:['customer.name']" view-ledger [ledger]="ledger"></tr>
    </table>
    `
    , directives: [ViewComponent]
    , pipes: [OrderBy]
})
export class IndexComponent {

    ledgers: Rx.Observable<List<ILedger>>;

    constructor(private store: CustomerLedgerStore) {

        this.ledgers = this.store.get();

    }

}


// <view-ledger *ngFor="let ledger of ledgers | async" [ledger]="ledger"></view-ledger>

// filters
// filterBy:'customer.name':'foo':true
// orderBy:['customer.name']