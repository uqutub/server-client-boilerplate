import { Component, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';

import {CustomerStore, ProductStore, InvoiceStore, CustomerLedgerStore} from '../../stores/index'; 

@Component({
  selector: 'app-root'
  , templateUrl: 'ng2-rc5/components/app/app.html'
  , providers: [CustomerStore, ProductStore, InvoiceStore, CustomerLedgerStore]
  , host: {
    class: "container"
  }
  // , encapsulation: ViewEncapsulation.Native
})
export class AppComponent {

  constructor(private router: Router) {
    
  }

  ngOnInit(){
   
  }

  home() {
    this.router.navigate(['']);
  }

  customers() {
    this.router.navigate(['customers']);
  }

  products(){
    this.router.navigate(['products']);
  }
  
}