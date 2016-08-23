import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router';

import {IProduct} from '../../models/index';
import {ProductStore} from '../../stores/index';

@Component({
    selector: 'delete-product',
    template: `
    <h3>Delete Customer</h3>
    <hr/>
    <h5 [routerLink]="['../../']"><a>Show Customers</a></h5>
    <br />
    Are you sure?
    <input type="button" class="btn btn-default" name="submit" value="Yes" />
 `
})
export class DeleteComponent {

    constructor(private store: ProductStore, private route: ActivatedRoute) {
        this.route.params.subscribe((r) => {
            console.log('params', r);
        })
    }

}