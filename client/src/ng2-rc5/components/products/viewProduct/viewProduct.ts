import {Component, Input} from '@angular/core';

import {IProduct} from '../../../models/index';
import {ProductStore} from '../../../stores/index';

@Component({
    selector: 'product-view',
    template: ` 
    <div class="panel panel-info">
        <div class="panel-heading">
            <span class="panel-title">{{product.name}} / {{product.category}}</span>
            <p class="text-right">
                <span class="text-success" (click)="e(product);"><i class="glyphicon glyphicon-edit"></i></span> | <span class="text-danger" (click)="d(product._id);"><i class="glyphicon glyphicon-remove"></i></span>  
            </p>
        </div>
        <div class="panel-body">
           {{product.cost}}
        </div>
    </div>
    `
})
export class ProductViewComponent {
    @Input() product: IProduct;

    constructor(private store: ProductStore) {
        console.log('product viewwww');
    }

    e(product: IProduct) {
        console.log('edit product', product);
    }

    d(id: string) {
        console.log('delete product', id);
        this.store.delete(id).subscribe(res => {
            console.log('prod del observable: ', res);
            if(res.err) {
                //err
            } else{
                // sccuess
            }
        });
    }

}