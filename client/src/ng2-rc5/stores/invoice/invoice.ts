import {Injectable} from '@angular/core'
// import {BehaviorSubject, Observable} from 'rxjs';
import Rx = require('rxjs/Rx');
import {List} from 'immutable';

import {IInvoice} from '../../models/index';
import {returnObjType} from '../../helper/helper';
import {HttpService} from '../../services/index';
import {CustomerLedgerStore} from '../customerLedger/customerLedger';
import {HandleStore} from '../handleStore';

@Injectable()
export class InvoiceStore {

    once: boolean = false;
    // behavioralSubject as invoices
    private behavioralSubject$: Rx.BehaviorSubject<List<IInvoice>> = new Rx.BehaviorSubject(List([]));

    constructor(private http: HttpService, private store: HandleStore, private custLedgerStore: CustomerLedgerStore) {
        console.log('Observable store for invoice.... Contructor Loaded');
    }

    loadData(): void {
        let _observable = this.http.get('/api/invoice/');
        this.store.get(_observable, this.behavioralSubject$).subscribe(res => {
            if (!res.err) {
                this.once = true;
            }
        });
    }

    reloadData(): void {
        this.loadData();
    }

    get(): Rx.Observable<List<IInvoice>> {
        if (this.once) {
            return this.behavioralSubject$.asObservable();
        } else {
            this.loadData();
            return this.behavioralSubject$.asObservable();
        }
    }

    getSingle(id?) {
        return this.behavioralSubject$.map((list)=>{
            console.log(list);
            return list.filter((obj) => {
                if(obj._id === id){
                    console.log('obj', obj)
                }
                return obj._id === id;
            })
        })
    }


    add(obj: IInvoice): Rx.Observable<returnObjType> {
        let _observable = this.http.post('/api/invoice/', obj);
        _observable.subscribe(res => {
            if (!res.err) {
                // add invoice in Observable
                let oldState = this.behavioralSubject$.getValue();
                let newState = oldState.push(res.data.invoice)
                this.behavioralSubject$.next(newState);

                // customerLedger update
                this.custLedgerStore.get(); // first getting ledger from server then add new record, else it will duplicate
                setTimeout(() => {
                    this.custLedgerStore.add(res.data.ledger, false);
                }, 1000)
            }
        });
        return _observable;
        // return this.store.add(_observable, this.behavioralSubject$);
    }

    update(obj: IInvoice): Rx.Observable<returnObjType> {
        let _observable = this.http.put('/api/invoice/' + obj._id, obj);
        return this.store.update(obj, _observable, this.behavioralSubject$);
    }

    delete(id: string): Rx.Observable<returnObjType> {
        let _observable = this.http.delete('/api/invoice/' + id);
        return this.store.delete(id, _observable, this.behavioralSubject$);
    }
}