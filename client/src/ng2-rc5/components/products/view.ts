import {Component, Input} from '@angular/core';

import {IProduct} from '../../models/index';

@Component({
    selector: 'view-product',
    template: `
    <div class="panel panel-info">
        <div class="panel-heading">
            <span class="panel-title">{{product.name}} / {{product.category}}</span>
            <p class="text-right">
                <span class="text-success" [routerLink]="['edit', product._id]"><i class="glyphicon glyphicon-edit"></i></span> 
                  |  
                <span class="text-danger" [routerLink]="['delete', product._id]"><i class="glyphicon glyphicon-remove"></i></span>  
            </p>
        </div>
        <div class="panel-body">
           {{product | json}}
        </div>
    </div>
    `
})
export class ProductViewComponent {
    @Input() product: IProduct;

    constructor() {
        console.log('product view1');
    }
}