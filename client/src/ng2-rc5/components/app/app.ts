import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {CustomerStore, ICustomer, ProductStore} from '../../stores/index'; 

@Component({
  selector: 'ng-app'
  , templateUrl: 'ng2-rc5/components/app/app.html'
  // , providers: [CustomerStore, ProductStore]
})
export class AppComponent {

  constructor(private router: Router) {

  }

  customers() {
    this.router.navigate(['customers']);
  }

  products(){
    this.router.navigate(['products']);
  }
  
}