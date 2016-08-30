import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import {InvoiceStore} from '../../stores/index';

@Component({
    selector: 'delete-invoice'
    , template: `
    <h3>Delete Invoice</h3>
    <hr/>
    <h5><a [routerLink]="['../../']">Show Invoices</a></h5>
`
})
export class DeleteComponent {

    constructor(private routes: ActivatedRoute, private router: Router, private store: InvoiceStore) {
        this.routes.params.subscribe((params) => {
            console.log('params', params);
            this.store.delete(params['id']).subscribe( res =>{
                console.log('res: ', res);
                this.router.navigate(['inv']);
            });
        });

    }
}