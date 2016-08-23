import {Component} from '@angular/core'

import {IProduct} from '../../models/index';
import {ProductStore} from '../../stores/index';

@Component({
    selector: 'add-product',
    template: `
    <h3>Add Customer</h3>
    <hr/>
    <h5 [routerLink]="['../']"><a>Show Customers</a></h5>
    <br />
    <input type="text" class="form-control" name="name" #name placeholder="product name" />
    <input type="text" class="form-control" name="category" #category placeholder="category" />
    <input type="text" class="form-control" name="cost" #cost placeholder="cost" />
    <input type="button" class="btn btn-default" name="submit" value="Add +" (click)="add(name, category, cost);"/>
 `
})
export class AddComponent {

    constructor(private store: ProductStore) {

    }

    add(name, category, cost) {
        console.log('_product', name.value, category.value, cost.value)

        let _prod: IProduct = {
            name: name.value,
            category: category.value,
            rate: cost.value
        };

        console.log('add product', _prod)

        this.store.add(_prod).subscribe(res => {
            console.log('products subs', res);
            if (res.err) {

            } else {
                // clear customer object
                this.clear(name, category, cost);
            }
        });
    }

    clear(name, category, cost): void {
        console.log('clear product object');
        name.value = '';
        category.value = '';
        cost.value = '';
    }

}