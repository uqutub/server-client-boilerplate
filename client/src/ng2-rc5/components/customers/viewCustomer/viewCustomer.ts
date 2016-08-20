import {Component, Input} from '@angular/core';

import {ICustomer} from '../../../models/index';
import {CustomerStore} from '../../../stores/index';

@Component({
    selector: 'customer-view',
    template: ` 
    <div class="panel panel-info">
        <div class="panel-heading">
            <span class="panel-title">{{customer.name}} / {{customer.company}}</span>
            <p class="text-right">
                <span class="text-success" (click)="e(customer);"><i class="glyphicon glyphicon-edit"></i></span>
                  | 
                <span class="text-danger" (click)="d(customer._id);"><i class="glyphicon glyphicon-remove"></i></span>  
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

    constructor(private store: CustomerStore) {
        console.log('customer viewwww');
    }

    e(customer: ICustomer) {
        console.log('edit customer', customer);
    }

    d(id: string) {
        console.log('delete customer', id);
        this.store.delete(id).subscribe(res => {
            console.log('cust del observable: ', res);
            if(res.err) {
                //err
            } else{
                // sccuess
            }
        });
    }

}