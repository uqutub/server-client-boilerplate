import {Component, Input} from '@angular/core';

import {IInvoice} from '../../models/index';

@Component({
    selector: 'view-invoice'
    , template: `
    <div class="panel" [class.panel-info]="odd" [class.panel-warning]="even">
        <div class="panel-heading">
            <span class="panel-title">{{invoice.customer.name}} / {{invoice.customer.company}} / S.T. {{invoice.customer.salesTax}} / NTN. {{invoice.customer.ntn}} </span>
            <p class="pull-right">
                {{invoice.dated | date}}  |  
                <span class="text-success"><i class="glyphicon glyphicon-edit"></i></span>
                    | 
                <span class="text-danger" [routerLink]="['delete', invoice._id]"><i class="glyphicon glyphicon-trash"></i></span>  
            </p>
        </div>
        <!--<div class="panel-body"> </div>-->
        <table class="table table-striped table-responsive">
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
            </tr>
            <tr *ngFor="let p of invoice.product">
                <td>{{p.name}}</td>
                <td>{{p.qty}}</td>
                <td>{{p.rate}}</td>
            </tr>
            <tr>
                <td colspan="3"> Total Amount: {{ invoice.total | currency:'PKR':false}} </td>
            </tr>
        </table>
    </div>
`
})
export class InvoiceViewComponent {
    @Input() invoice: IInvoice;
    @Input() odd: boolean;
    @Input() even: boolean;

    constructor() {

    }

    ngOnInit() {
        console.log(this.odd, this.even);
    }
  
}