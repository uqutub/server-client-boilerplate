import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router';

import {IProduct} from '../../models/index';
import {ProductStore} from '../../stores/index';

@Component({
    selector: 'edit-product',
    template: `
    <h3>Update Product</h3>
    <hr/>
    <h5 [routerLink]="['../../']"><a>Show Products</a></h5>
    <br />
    Are you sure?
    <input type="button" class="btn btn-default" name="submit" value="Yes" />
 `
})
export class UpdateComponent {

    constructor(private store: ProductStore, private route: ActivatedRoute) {
        this.route.params.subscribe((r) => {
            console.log('params', r, r['id']);
        });
    }

}