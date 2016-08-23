import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router';

import {ICustomer} from '../../models/index';
import {CustomerStore} from '../../stores/index';

@Component({
    selector: 'edit-customer',
    template: `
    <h3>Update Customer</h3>
    <hr/>
    <h5 [routerLink]="['../../']"><a>Show Customers</a></h5>
    <br />

    Are you sure?

    <input type="button" class="btn btn-default" name="submit" value="Yes" />
 `
})
export class UpdateComponent {

    constructor(private store: CustomerStore, private route: ActivatedRoute) {
        this.route.params.subscribe((r) => {
            console.log('params', r, r['id']);
        });
    }

}