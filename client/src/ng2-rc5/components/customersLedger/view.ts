import {Component, Input} from '@angular/core';

import {ILedger} from '../../models/index';

@Component({
    selector: 'view-ledger'
    , template: `
    <div class="panel panel-info">
        <div class="panel-heading">
            <span class="panel-title">{{ledger.customer.name}} / {{ledger.customer.company}}</span>
            <p class="text-right">
                <span class="text-success"><i class="glyphicon glyphicon-edit"></i></span>
                    | 
                <span class="text-danger"><i class="glyphicon glyphicon-remove"></i></span>  
            </p>
        </div>
        <div class="panel-body">
            Credit: {{ledger.credit}} 
            <br/>
            Debit: {{ledger.debit}}
            <br/>
            Remarks: {{ledger.remarks}}
        </div>
    </div>
    `
})
export class LedgerViewComponent {
    @Input() ledger: ILedger;

    constructor() {

    }
}