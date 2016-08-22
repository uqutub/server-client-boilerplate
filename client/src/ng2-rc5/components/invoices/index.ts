import {Component} from '@angular/core';

import {AddComponent} from './add';

@Component({
selector: 'invoices'
, template: `
    <h3>Invoices</h3>
    <hr/>
    <h5> <a [routerLink]="['add']">Add Invoice</a> </h5>
`
, directives: [AddComponent]
})
export class IndexComponent{
    
    constructor() {
        
    }
}