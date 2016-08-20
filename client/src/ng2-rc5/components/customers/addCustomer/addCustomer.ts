import {Component} from '@angular/core'

import {ICustomer} from '../../../models/index';
import {CustomerStore} from '../../../stores/index';

@Component({
    selector: 'add-customer',
    template: `
    <input type="text" name="name" #name placeholder="customer name" />
    <input type="text" name="company" #company placeholder="company name" />
    <input type="text" name="address" #address placeholder="address" />
    <input type="text" name="phone" #phone placeholder="phone" />
    <input type="text" name="mobile" #mobile placeholder="mobile" />
    <input type="text" name="stx" #stx placeholder="sales tax #" />
    <input type="text" name="ntn" #ntn placeholder="ntn #" />
    <input type="button" name="submit" value="submit" (click)="add(name, company, address, phone, mobile, stx, ntn);"/>
 `
})
export class CustomerAddComponent {

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