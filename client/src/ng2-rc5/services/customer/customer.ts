import {Injectable} from '@angular/core';
import {HttpService} from '../httpService';
import {returnObjType} from '../../helper/helper';

@Injectable()
export class CustomerService {

    customers: ICustomer[] = [];
    once: boolean = true;


    constructor(private http: HttpService) {

    }

    get(): void {
        new Promise((resolve, reject) => {
            if (this.once) {
                this.http.get('/api/customer/').subscribe((res) => {
                    let obj: returnObjType = res.json();
                    if (obj.err) {
                        reject(obj.err);
                    } else {
                        this.once = false;
                        resolve(obj.data);
                    }
                });
            } else {
                resolve(this.customers);
            }
        });
    }

    add(obj: ICustomer): void {
        new Promise((resolve, reject) => {
            this.http.post('/api/customer/', obj).subscribe((res) => {
                let obj: returnObjType = res.json();
                if (obj.err) {
                    reject(obj.err);
                } else {
                    this.customers.push(obj.data);
                    resolve();
                }
            });
        });
    }

    update(id: string): void {

    }

    delete(id: string): void {
        new Promise((resolve, reject) => {
            this.http.delete('/api/customer/'+id+'/?').subscribe((res) => {
                let obj: returnObjType = res.json();
                if (obj.err) {
                    reject(obj.err);
                } else {
                    this.customers.push(obj.data);
                    resolve();
                }
            });
        });
    }



}


// interface of customer
export interface ICustomer {
    _id?: string;
    name: string;
    company: string;
    address: string;
    phone: string;
    mobile: string;
    salesTax: string;
    ntn: string;
    dated: number;
}