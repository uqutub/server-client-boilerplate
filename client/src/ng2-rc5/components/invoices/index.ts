import {Component} from '@angular/core';

@Component({
selector: 'invoices'
, template: `
    <h3>Invoices</h3>
    <hr/>
    <h5 (click)="showNewPanel=!showNewPanel"><a>Add Invoice</a></h5>
`
})
export class IndexComponent{
    
    constructor() {
        
    }
}