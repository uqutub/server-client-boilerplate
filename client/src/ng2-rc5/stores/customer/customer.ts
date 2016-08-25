import {Injectable} from '@angular/core';
// import {BehaviorSubject, Observable} from 'rxjs';
import Rx = require('rxjs/Rx');
import {List} from 'immutable';

import {ICustomer} from '../../models/index';
import {returnObjType} from '../../helper/helper';
import {HttpService} from '../../services/index';
import {HandleStore} from '../handleStore';

@Injectable()
export class CustomerStore {

    once: boolean = false;
    private customers$: Rx.BehaviorSubject<List<ICustomer>> = new Rx.BehaviorSubject(List([]));


    constructor(private http: HttpService, private store: HandleStore) {
        console.log('Observable store for customer.... Contructor Loaded');
    }

    loadData(): void {
        let _observable = this.http.get('/api/customer/');
        this.store.get(_observable, this.customers$).subscribe(res => {
            if (!res.err) {
                this.once = true;
            }
        });
    }

    reloadData(): void {
        this.loadData();
    }

    get(): Rx.Observable<List<ICustomer>> {
        if (this.once) {
            return this.customers$.asObservable();
        } else {
            this.loadData();
            return this.customers$.asObservable();
        }
    }

    add(obj: ICustomer): Rx.Observable<returnObjType> {
        let _observable = this.http.post('/api/customer/', obj);
        return this.store.add(_observable, this.customers$);
    }

    update(obj: ICustomer): Rx.Observable<returnObjType> {
        let _observable = this.http.put('/api/customer/' + obj._id, obj);
        return this.store.update(obj, _observable, this.customers$);
    }

    delete(id: string): Rx.Observable<returnObjType> {
        let _observable = this.http.delete('/api/customer/' + id);
        return this.store.delete(id, _observable, this.customers$);
    }

}

// // interface of customer
// export interface ICustomer {
//     _id?: string;
//     name: string;
//     company: string;
//     address: string;
//     phone: string;
//     mobile: string;
//     salesTax: string;
//     ntn: string;
//     dated: number;
// }



// Without handleStore
//
//  get(): Observable<any> {
//         if (!this.once) {

//             return this.customers$.asObservable();

//         } else {

//             let _observable = this.http.get('/api/customer/');

//             _observable.subscribe((res) => {
//                 if (!res.err) {
//                     this.once = false;
//                     let newState: List<ICustomer> = <List<ICustomer>>this.customers$.getValue().concat(res.data);
//                     this.customers$.next(newState);
//                 }
//             });

//             return _observable;
//         }
//     }

//     add(obj: ICustomer): Observable<any> {
//         let _observable = this.http.post('/api/customer/', obj);

//         _observable.subscribe((res) => {
//             if (!res.err) {
//                 let oldState = this.customers$.getValue();
//                 let newState = oldState.push(res.data)
//                 this.customers$.next(newState);

//                 // Method #2
//                 // let newState: List<ICustomer> = <List<ICustomer>>this.customers$.getValue().concat(res.data);
//             }
//         });

//         return _observable;
//     }

//     update(obj: ICustomer): Observable<any> {
//         let _observable = this.http.put('/api/customer/' + obj._id, obj);

//         _observable.subscribe((res) => {
//             if (!res.err) {
//                 let oldState: List<ICustomer> = <List<ICustomer>>this.customers$.getValue();
//                 let index = oldState.findIndex((cust: ICustomer) => cust._id === obj._id);
//                 let newState = oldState.set(index, obj);
//                 // let customer: ICustomer = oldState.get(index);
//                 this.customers$.next(newState);

//                 // Method #2
//                 // let newState: List<ICustomer> = <List<ICustomer>> oldState.map((cust) => {
//                 //     if (cust._id === obj._id) {
//                 //         let newObj = obj;
//                 //         return newObj;
//                 //     } else {
//                 //         return cust;
//                 //     }
//                 // });
//                 // this.customers$.next(newState);
//             }
//         });
//         return _observable;
//     }

//     delete(id: string): Observable<any> {
//         let _observable = this.http.delete('/api/customer/' + id + '/?');

//         _observable.subscribe((res) => {
//             if (!res.err) {
//                 let oldState: List<ICustomer> = <List<ICustomer>>this.customers$.getValue();
//                 let newState: List<ICustomer> = <List<ICustomer>>oldState.filter((customer) => customer._id !== id);
//                 this.customers$.next(newState);

//                 // Method #2
//                 // let index = oldState.findIndex((customer) => customer._id === id);   
//                 // let newState = oldState.delete(index);
//                 // this.customers$.next(newState);
//             }
//         });

//         return _observable;
//     }