import { Component } from '@angular/core';

import Rx = require('rxjs/Rx');
import {List} from 'immutable';

import {ProductViewComponent as ViewComponent} from './view';
import {IProduct} from '../../models/index';
import {ProductStore} from '../../stores/index';

@Component({
  selector: 'products'
  , template: `
    <h3>Products</h3>
    <hr/>
    <h5>
      <a [routerLink]="['add']">Add Product</a>
    </h5>
    <p>
        <br>
    </p>
    <view-product *ngFor="let product of products | async" [product]="product"></view-product>
  ` 
//   , templateUrl: 'ng2-rc5/components/products/products.html'
  , directives: [ViewComponent]
})
export class IndexComponent {

  products: Rx.Observable<List<IProduct>>;

  constructor(private store: ProductStore) {
    // console.log('productttttttttttttttttttttt ')
    this.products = this.store.get();
  }



}