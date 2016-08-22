import {Component,Input} from '@angular/core';

import {IInvoice} from '../../models/index';

@Component({
selector: 'view-invoice'
, template: `
    {{invoice._id}}
    {{invoice.total}}
`
})
export class ViewComponent{
    @Input() invoice: IInvoice 

    constructor() {
        
    }
}