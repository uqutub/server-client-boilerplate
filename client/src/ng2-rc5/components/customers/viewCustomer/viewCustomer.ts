import {Component, Input} from '@angular/core';

import {ICustomer} from '../../../models/index';

@Component({
    selector: 'customer-view',
    template: ` 
    <div class="panel panel-info">
        <div class="panel-heading">
            <span class="panel-title">{{customer.name}} / {{customer.company}}</span>
            <p class="text-right">
                <span class="text-success" (click)="eCustomer(customer);"><i class="glyphicon glyphicon-edit"></i></span> | <span class="text-danger" (click)="dCustomer(customer._id);"><i class="glyphicon glyphicon-remove"></i></span>  
            </p>
        </div>
        <div class="panel-body">
           {{customer.address}}
        </div>
    </div>
    `
})
export class CustomerViewComponent {
    @Input() customer: ICustomer;

    constructor() {
        console.log('customer viewwww');
    }

    eCustomer(customer: ICustomer) {
        console.log('edit customer', customer);
    }

    dCustomer(id: string) {
        console.log('delete customer', id);
    }

}