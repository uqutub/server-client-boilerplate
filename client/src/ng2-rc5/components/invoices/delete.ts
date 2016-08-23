import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'delete-invoice'
    , template: `
    <h3>Delete Invoice</h3>
    <hr/>
    <h5><a>Show Invoices</a></h5>
    <input type="text" name="" placeholder="1" />
    <input type="text" name="" placeholder="2" />
    <input type="text" name="" placeholder="3" />
`
})
export class DeleteComponent {

    constructor(private route: ActivatedRoute) {
        // this.route.params.subscribe((r) => {
        //     console.log('params', r);
        // })
    }
}