import {Component} from '@angular/core';
import Rx = require('rxjs');
import {List} from 'immutable';

import {CustomerStore, ProductStore} from '../../stores/index';
import {IProduct, ICustomer} from '../../models/index';

@Component({
    selector: 'add-invoice'
    , template: `
    <h3>Add Invoice</h3>
    <hr/>
    <h5><a [routerLink]="['../']">Show Invoices</a></h5>
    <form (ngSubmit)="onSubmit(invForm.valid, invForm.value)" #invForm="ngForm" novalidate>
        <input type="date" name="date" #date="ngModel" [(ngModel)]="_date"  class="form-control" placeholder="date" required/>
        <select class="form-control" name="customer" #customer="ngModel" [(ngModel)]="_customer" required>
            <option value="-1" disabled selected>Select Customer</option>
            <option *ngFor="let cust of customers | async" [value]="cust">{{cust.company}}</option>
        </select>
        <table class="table">
            <tr>
                <form #invProdForm="ngForm" (ngSubmit)="onSubmitProduct(invProdForm.valid, invProdForm.value)" novalidate >
                    <td> 
                        <select class="form-control" name="product" #product="ngModel" [(ngModel)]="_product" required>
                            <option value="-1" disabled selected>Select Product</option>
                            <option *ngFor="let prod of products | async" [value]="prod">{{prod.name}}</option>
                        </select> 
                        <small class="text-danger" [hidden]="product.valid || (product.pristine && !invProdForm._submitted)">
                            *
                        </small> 
                    </td>
                    <td> 
                        <input type="number" name="qty" #qty="ngModel" [(ngModel)]="_qty" class="form-control" placeholder="qty" required/>
                        <small class="text-danger" [hidden]="qty.valid || (qty.pristine && !invProdForm._submitted)">
                            *
                        </small> 
                    </td>
                    <td> 
                        <input type="number" name="price" #price="ngModel" [(ngModel)]="_price" class="form-control" placeholder="price" required/>
                        <small class="text-danger" [hidden]="price.valid || (price.pristine && !invProdForm._submitted)">
                            *
                        </small>  
                    </td>
                    <td> 
                        <input type="submit" name="add" class="btn btn-info" value="add +" /> 
                    </td>
                </form>
            </tr>
            <tr *ngFor="let product of productList">
                <td>
                    {{product.name}}
                </td>
                <td>
                    {{product.qty}}
                </td>
                <td>
                    {{product.rate}}
                </td>
                <td>
                    {{product.total}}
                </td>
            </tr>
            <tr>
                <td>
                    Total Invoice Amount: 
                </td>
            </tr>
        </table>
        <input type="submit"  name="add" class="btn btn-primary" value="Create Invoice" />
    </form>
`
})
export class AddComponent {

    public customers: Rx.Observable<List<ICustomer>>;
    public products: Rx.Observable<List<IProduct>>;
    public productList: IProduct[];
    _date: Date;

    constructor(private cStore: CustomerStore, private pStore: ProductStore) {
        this.customers = this.cStore.get();
        this.products = this.pStore.get();
        this.productList = [];
        this._date = this.date2str(new Date(), 'yyyy-MM-dd');


    }

    onSubmit(valid, obj) {
        console.log('submit')
        event.preventDefault();
        console.log(valid, obj);
    }

    onSubmitProduct(valid, obj) {
        console.log('product')
        event.preventDefault();
        console.log(valid, obj);
    }

    date2str(x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
    });

    return y.replace(/(y+)/g, function(v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}
}