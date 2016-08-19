import { Component } from '@angular/core';
// import {Observable} from 'rxjs';
import Rx = require('rxjs/Rx');
import {List} from 'immutable';

import {IProduct} from '../../models/index';
import {ProductStore} from '../../stores/index';

@Component({
  selector: 'products'
  , templateUrl: 'ng2-rc5/components/products/products.html'
  , providers: [ProductStore]
})
export class ProductComponent {

  products: Rx.Observable<List<IProduct>>;

  constructor(private store: ProductStore) {
    // console.log('productttttttttttttttttttttt ')
    this.products = this.store.get();
  }



}