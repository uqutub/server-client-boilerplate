import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {IInvoice} from '../../models/index';
import {InvoiceStore} from '../../stores/index';

@Component({
    selector: 'print-invoice'
    , template: `
    <p><br></p>
    <p><br></p>



{{invoice | json}}






    
`
})
export class PrintInvoiceComponent {
    invoice;

    constructor(private routes: ActivatedRoute, private router: Router, private store: InvoiceStore) {
        this.routes.params.subscribe((params: any) => {
            this.store.getSingle(params.id).subscribe(res => {
                console.log('res', res)
                res.map((item)=>{
                    this.invoice = item;
                });
            })
            // this.router.navigate(['inv']);
        });
    }

    ngOnInit() {
        // console.log(tis.odd, this.even);
    }
  
}