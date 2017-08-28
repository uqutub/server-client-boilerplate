import {Component} from '@angular/core';
import Rx = require('rxjs');
import {List} from 'immutable';


import {LedgerViewComponent as ViewComponent} from './view';
import {ILedger} from '../../models/index';
import {CustomerLedgerStore} from '../../stores/index';

@Component({
    selector: 'ledgers'
    , template: `
    <h3>Customer Ledgers</h3>
    <hr/>
    <h5 [routerLink]="['add']"><a>Add Ledger</a></h5>
    <br />
    <view-ledger *ngFor="let ledger of ledgers | async" [ledger]="ledger"></view-ledger>
    `
    , directives: [ViewComponent]
})
export class IndexComponent {

    ledgers: Rx.Observable<List<ILedger>>;

    constructor(private store: CustomerLedgerStore) {
        this.ledgers = this.store.get();
    }

}


// <view-ledger *ngFor="let ledger of ledgers | async" [ledger]="ledger"></view-ledger>