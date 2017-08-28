import {Component, Input} from '@angular/core';

import {IInvoice} from '../../models/index';

@Component({
    selector: 'view-invoice'
    , template: `
    <div class="panel panel-info">
        <div class="panel-heading">
            <span class="panel-title">{{invoice.customer.name}} / {{invoice.customer.company}}</span>
            <p class="text-right">
                <span class="text-success"><i class="glyphicon glyphicon-edit"></i></span>
                    | 
                <span class="text-danger"><i class="glyphicon glyphicon-remove"></i></span>  
            </p>
        </div>
        <div class="panel-body">
            Invoice Total: {{invoice.total}} {{dated()}}
        </div>
    </div>
`
})
export class InvoiceViewComponent {
    @Input() invoice: IInvoice;

    constructor() {

    }

    dated() {
        return new Date(this.invoice.dated);
    }
}