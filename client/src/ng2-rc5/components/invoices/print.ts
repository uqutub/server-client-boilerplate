import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {IInvoice} from '../../models/index';
import {InvoiceStore} from '../../stores/index';

@Component({
    selector: 'print-invoice'
    , template: `
    <p><br></p>
    <p><br></p>
    <div id="htmlDiv" style="margin: 0px">
        <div style="text-align: center; margin-top: 10px">
            BILL<br>
            <b>AL-MAIMOON TRADING</b><br> IMPORTER & DEALER IN STAINLESS STEEL MATERIALS <br> GST: 17-03-9999-597-73 N.T.N: 09-02-0855134
        </div>

        <div>
            <p style="float: left ; margin-left: 10px">
                <b>PHONE: </b> 021-32745215<br>
                <b>FAX:</b> 9221-32770152<br>
                <b>EMAIL: </b><a href="">al-maimoontrading@hotmail.com</a><br>
            </p>
            <p style="float: right ; margin-right:10px">
                Shop No G8, culcutta Building <br> Najmuddin Street , Nanakwada <br> Karachi, Pakistan
            </p>
        </div>

        <div style="clear: both; margin: 10px">
            <span>Bill No:</span>
            <span style="float: right; margin-right:160px">Dated:</span>
            <p>Messrs:</p>
            P.O No <span style="margin-left: 370px">Dated:</span><span style="float: right; margin-right:144px">C.H , No</span>
        </div>

        <div style="bottom: 30px; position: absolute; width: 100%">
            <p style="float: left ; padding-left: 10px">Terms: We are not responsible for loss, wrong devlivery, leakage <br>
            or shortage of transit. Goods supplied to order will not be accepted back.</p>

            <p style="float: right ; margin-right: 10px">
                E. & O.E<br><br>
                For M.F . Mandviwalla
            </p>
        </div>
    </div>

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