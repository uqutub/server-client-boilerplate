import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-app'
  , templateUrl: 'ng2-rc5/components/app/app.html'
})
export class AppComponent {

  constructor(private router: Router) {

  }

  customers() {
    this.router.navigate(['customers']);
  }
  
}