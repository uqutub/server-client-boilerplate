import {Component, Input} from '@angular/core';

import {ICustomer} from '../../models/index';

@Component({
    selector: 'view-customer'
    , template: `
     <div class="panel panel-info">
        <div class="panel-heading">
            <span class="panel-title">{{customer.name}} / {{customer.company}}</span>
            <p class="text-right">
                <span class="text-success" [routerLink]="['edit', customer._id]"><i class="glyphicon glyphicon-edit"></i></span>
                  | 
                <span class="text-danger" [routerLink]="['delete', customer._id]"><i class="glyphicon glyphicon-remove"></i></span>  
            </p>
        </div>
        <div class="panel-body">
           {{customer.address}}
        </div>
    </div>
`
})
export class ViewComponent {
    @Input() customer: ICustomer;

    constructor() {
        console.log('customer viewwww');
    }

    // e(customer: ICustomer) {
    //     console.log('edit customer', customer);
    // }

    // d(id: string) {
    //     console.log('delete customer', id);
    //     this.customerstore.delete(id).subscribe(res => {
    //         console.log('cust del observable: ', res);
    //         if (res.err) {
    //             //err
    //         } else {
    //             // sccuess
    //         }
    //     });
    // }
}