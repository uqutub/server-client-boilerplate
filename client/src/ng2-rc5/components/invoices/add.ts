import {Component} from '@angular/core';
import {Router} from '@angular/router';
import Rx = require('rxjs');
import {List} from 'immutable';

import {CustomerStore, ProductStore, InvoiceStore} from '../../stores/index';
import {IProduct, ICustomer, IInvoice} from '../../models/index';

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
            <option *ngFor="let cust of customers | async" [value]="cust | json">{{cust.company}}</option>
        </select>
        <table class="table">
            <tr>
                <form #invProdForm="ngForm" (ngSubmit)="onSubmitProduct(invProdForm.valid, invProdForm.value, customer)" novalidate >
                    <td> 
                        <select class="form-control" name="product" #product="ngModel" [(ngModel)]="_product" required>
                            <option value="-1" disabled selected>Select Product</option>
                            <option *ngFor="let prod of products | async" [value]="prod | json">{{prod.name}}</option>
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
                        <input type="number" name="rate" #rate="ngModel" [(ngModel)]="_rate" class="form-control" placeholder="price" required/>
                        <small class="text-danger" [hidden]="rate.valid || (rate.pristine && !invProdForm._submitted)">
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
                    Total Invoice Amount: {{invoiceTotalAmount}}
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
    public invoice: IInvoice = <IInvoice>{};

    invoiceTotalAmount: number = 0.00;
    _date: Date;
    _qty: number;
    _rate: number;
    _product;

    constructor(private cStore: CustomerStore, private pStore: ProductStore, private iStore: InvoiceStore, private router: Router) {
        this.customers = this.cStore.get();
        this.products = this.pStore.get();
        this.productList = [];
        this._date = this.date2str(new Date(), 'yyyy-MM-dd');
    }

    onSubmit(valid, obj) {
        event.preventDefault();
        if (!valid) return;
        
        this.invoice.dated = Date.parse(obj.date);
        this.invoice.customer = <ICustomer>JSON.parse(obj['customer']);
        this.invoice.product = this.productList;
        this.invoice.total = this.invoiceTotalAmount;
        this.iStore.add(this.invoice).subscribe(r => {
           if(!r.err){
               this.router.navigate(['inv']);
           }
        });
    }

    onSubmitProduct(valid, obj) {
        event.preventDefault();
        if (!valid) return;
        else this.addProduct(obj);
    }

    addProduct(obj) {
        obj['product'] = JSON.parse(obj['product']);
        obj['product']['qty'] = obj.qty;
        obj['product']['rate'] = obj.rate;
        obj['product']['total'] = obj.qty * obj.rate;
        this.productList.push(obj['product']);

        this._product = "-1";
        this._qty = null;
        this._rate = null;
        this.invoiceTotalAmount += obj['product']['total'];
    }

    delProduct(obj: IProduct) {
        this.productList.filter((prod) => prod._id !== obj._id);
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