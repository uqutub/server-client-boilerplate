import {Component} from '@angular/core';

@Component({
selector: 'update-invoice'
, template: `
    <h3>Update Invoice</h3>
    <hr/>
    <h5 (click)="showNewPanel=!showNewPanel"><a>Show Invoices</a></h5>
    <input type="text" name="" placeholder="1" />
    <input type="text" name="" placeholder="2" />
    <input type="text" name="" placeholder="3" />
`
})
export class UpdateComponent{
    
    constructor() {
        
    }
}