import {Component, Input} from '@angular/core';

import {ICustomer} from '../../../models/index';

@Component({
    selector: 'customer-view',
    template: ` 
    <div>
        {{customer._id}}
        {{customer.name}}
    </div>
    `
})
export class CustomerViewComponent {
    @Input() customer: ICustomer;

    constructor() {
        console.log('customer viewwww')
    }

}