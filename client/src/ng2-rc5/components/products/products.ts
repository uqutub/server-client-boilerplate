import { Component } from '@angular/core';
// import {Observable} from 'rxjs';
import Rx = require('rxjs/Rx');
import {List} from 'immutable';

import {ProductAddComponent} from './addproduct/addProduct';
import {ProductViewComponent} from './viewProduct/viewProduct';

import {IProduct} from '../../models/index';
import {ProductStore} from '../../stores/index';

@Component({
  selector: 'products'
  , templateUrl: 'ng2-rc5/components/products/products.html'
  , directives: [ProductAddComponent, ProductViewComponent]
  , providers: [ProductStore]
})
export class ProductComponent {

  products: Rx.Observable<List<IProduct>>;
  showNewPanel: boolean = false;

  constructor(private store: ProductStore) {
    // console.log('productttttttttttttttttttttt ')
    this.products = this.store.get();
  }



}