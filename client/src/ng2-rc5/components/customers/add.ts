import {Component} from '@angular/core'

import {ICustomer} from '../../models/index';
import {CustomerStore} from '../../stores/index';

@Component({
    selector: 'add-customer',
    template: `
    <h3>Customers</h3>
    <hr/>
    <h5 [routerLink]="['../']"><a>Show Customers</a></h5>
    <br />
    <input type="text" class="form-control" name="name" #name placeholder="customer name" />
    <input type="text" class="form-control" name="company" #company placeholder="company name" />
    <input type="text" class="form-control" name="address" #address placeholder="address" />
    <input type="text" class="form-control" name="phone" #phone placeholder="phone" />
    <input type="text" class="form-control" name="mobile" #mobile placeholder="mobile" />
    <input type="text" class="form-control" name="stx" #stx placeholder="sales tax #" />
    <input type="text" class="form-control" name="ntn" #ntn placeholder="ntn #" />
    <input type="button" class="btn btn-default" name="submit" value="Add +" (click)="add(name, company, address, phone, mobile, stx, ntn);"/>
 `
})
export class AddComponent {

    constructor(private store: CustomerStore) {

    }

    add(name, company, address, phone, mobile, stx, ntn) {
        console.log('_cutomer', name.value, company.value, address.value, phone.value, mobile.value, stx.value, ntn.value)

        let _cust: ICustomer = {
            name: name.value,
            company: company.value,
            address: address.value,
            phone: phone.value,
            mobile: mobile.value,
            salesTax: stx.value,
            ntn: ntn.value
        };

        console.log('add customer', _cust)

        this.store.add(_cust).subscribe(res => {
            console.log('customer subs', res);
            if (res.err) {

            } else {
                // clear customer object
                this.clear(name, company, address, phone, mobile, stx, ntn);
            }
        });
    }

    clear(name, company, address, phone, mobile, stx, ntn): void {
        console.log('clear customer object');
        name.value = '';
        company.value = '';
        address.value = '';
        phone.value = '';
        mobile.value = '';
        stx.value = '';
        ntn.value = '';
    }

}