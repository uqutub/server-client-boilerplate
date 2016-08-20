import { Component, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';

import {CustomerStore, ProductStore} from '../../stores/index'; 

@Component({
  selector: 'app-root'
  , templateUrl: 'ng2-rc5/components/app/app.html'
  , providers: [CustomerStore, ProductStore]
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