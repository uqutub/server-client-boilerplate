import {Component} from '@angular/core';
import * as Rx from 'rxjs';
import {List} from 'immutable';
import {Router} from '@angular/router';

import {ICustomer, ILedger} from '../../models/index';
import {CustomerStore, CustomerLedgerStore} from '../../stores/index';

@Component({
    selector: 'add-ledger'
    , template: `
    <h3>Received Payments</h3>
    <hr/>
    <h5><a [routerLink]="['../']">Show Customer Ledger</a></h5>
     <form (ngSubmit)="onSubmit(invForm.valid, invForm.value)" #invForm="ngForm" novalidate>
        <input type="date" name="date" #date="ngModel" [(ngModel)]="_date"  class="form-control" placeholder="date" readonly required/>
        <select class="form-control" name="customer" #customer="ngModel" [(ngModel)]="_customer" required>
            <option value="-1" disabled selected>Select Customer</option>
            <option *ngFor="let cust of customers | async" [value]="cust | json">{{cust.company}}</option>
        </select>
        <input type="number" name="amount" #amount="ngModel" [(ngModel)]="_amount"  class="form-control" placeholder="amount.." required/>
        <select class="form-control" name="type" #type="ngModel" [(ngModel)]="_type" required>
            <option value="-1" disabled>Select Type</option>
            <option value="debit">Debit</option>
            <option value="credit" disabled>Credit</option>
        </select>
        <input type="text" name="remarks" #remarks="ngModel" [(ngModel)]="_remarks"  class="form-control" placeholder="narration..." required/>
        <br/>
        <input type="submit"  name="add" class="btn btn-primary" value="Create Invoice" />
    </form>
    `
})
export class AddComponent {

    public customers: Rx.Observable<List<ICustomer>>;
    _date: Date;
    _type;
    _customer;


    constructor(private router: Router, private cStore: CustomerStore, private lStore: CustomerLedgerStore) {
        this.customers = this.cStore.get();
        this._date = this.date2str(new Date(), 'yyyy-MM-dd');
    }

    ngOnInit() {
        this._type = "debit";
        this._customer = '-1';
    }

    onSubmit(valid, obj) {

        if (!valid || obj.customer == '-1') return;

        let ledger: ILedger = {
            customer: JSON.parse(obj['customer']),
            credit: 0,
            debit: parseFloat('-' + obj['amount']),
            remarks: obj['remarks'],
            dated: Date.now()
        }

        this.lStore.add(ledger, true).subscribe(res => {
            if (!res.err) {
                this.router.navigate(['cust-ledger']);
            }
        });

    }

    date2str(date, format) {
        var z = {
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds()
        };
        format = format.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2);
        });

        return format.replace(/(y+)/g, function (v) {
            return date.getFullYear().toString().slice(-v.length);
        });
    }

}