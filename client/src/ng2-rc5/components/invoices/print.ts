import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {IInvoice} from '../../models/index';
import {InvoiceStore} from '../../stores/index';

@Component({
    selector: 'print-invoice'
    , template: `
    <p><br></p>
    <button class="btn btn-primary" (click)="pdf(htmlDiv);"> -- Print -- </button>

    <div id="htmlDiv" #htmlDiv style="margin: 0px;">
        <div style="text-align: center; font-size: 10px; margin-top: 10px">
            <span style="font-size:8px;">BILL</span><br/>
            <b>AL-MAIMOON TRADING</b><br> IMPORTER & DEALER IN STAINLESS STEEL MATERIALS <br> GST: 17-03-9999-597-73 N.T.N: 09-02-0855134
        </div>

        <p><br/></p>

        <div>
            <div style="display:inline-block; width:40%;font-size: 10px;">
                <div>
                    Phone: +92 213 274 5215 <br />
                    Fax: +92 21 327 70152 <br />
                    Email: al-maimoontrading@hotmail.com <br />
                    <br />
                    Bill no.: {{invoice?._id}} <br/> <br/>
                    Messrs.: {{invoice?.customer?.company}}
                </div>
            </div>

            <div style="float:right; width:35%;font-size: 10px;">
                <div style="float:right;">
                    Shop No G8, culcutta Building <br> Najmuddin Street , Nanakwada <br> 
                    Karachi, Pakistan. <br />
                    <br />
                    Dated: {{invoice?.dated | date: 'longDate'}}
                </div>
            </div>
        </div>
        
        <br />
        
        <div style="font-size: 10px;">
            <div style="display:inline-block; width:40%">P.O. No.: ---</div>
            <div style="display:inline-block; width:22%">Dated: ---</div>
            <div style="display:inline-block; float:right; width:30%">C.H. No.: ----</div>
        </div>

        <br />

        <table style="width: 95%; margin: 0 10px; font-size: 10px; border: 1px solid red; border-collapse: collapse;">
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse;">
                        <b>Description of Goods</b>
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                        <b>Quantity</b>
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                        <b>Rate</b>
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                        <b>Amount</b>
                    </td>
                </tr>
                <tr *ngFor="let prod of invoice?.product" style="border: 1px solid black; border-collapse: collapse;">
                    <td style="border: 1px solid black; border-collapse: collapse;">
                        {{prod?.name}}
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                        {{prod?.qty}}
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                        {{prod?.rate}}
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                        {{prod?.total}}
                    </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td colspan="3" style="border: 1px solid black; border-collapse: collapse;">
                        &nbsp; &nbsp; &nbsp;  
                    </td>
                    <td style="border: 1px solid black; border-collapse: collapse;">
                        &nbsp; &nbsp; &nbsp;  
                    </td>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse;">
                    <td colspan="3" style="border: 1px solid black; border-collapse: collapse;">
                        <b>Total Amount</b>
                    </td>
                    <td style="text-align: center;">
                        <b>{{invoice?.total | currency:'PKR':false}}</b>
                    </td>
                </tr>
        </table>

        <div style="bottom: 30px; position: fixed;font-size: 8px;">
                Terms: We are not responsible for loss, wrong devlivery, <br>
                leakage or shortage of transit. Goods supplied to order will not be accepted back.
        </div>
        <div style="bottom: 30px; right:20px; position: fixed; font-size: 10px;">
            E. & O.E 
            <br/> <br/> 
            For M.F . Mandviwalla
        </div>

   
    </div>
    
`
})
export class PrintInvoiceComponent {
    invoice: IInvoice;

    constructor(private routes: ActivatedRoute, private router: Router, private store: InvoiceStore) {
        this.routes.params.subscribe((params: any) => {
            this.store.getSingle(params.id).subscribe(res => {
                res.map((item) => {
                    this.invoice = item;
                });
            })
            // this.router.navigate(['inv']);
        });
    }

    ngOnInit() {
        // console.log(tis.odd, this.even);
    }

    pdf(htmlDiv: HTMLDivElement) {
        this.store.pdf({ html: htmlDiv.innerHTML }).subscribe(r => {
            if (r.err) return;
            else window.open('http://localhost:3000/pdf/' + r.data.name, '_blank');
        });
    }

}