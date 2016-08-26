import {Injectable} from '@angular/core'
// import {BehaviorSubject, Observable} from 'rxjs';
import Rx = require('rxjs/Rx');
import {List} from 'immutable';

import {IInvoice} from '../../models/index';
import {returnObjType} from '../../helper/helper';
import {HttpService} from '../../services/index';
import {HandleStore} from '../handleStore';

@Injectable()
export class InvoiceStore {

    once: boolean = false;
    private behavioralSubject$: Rx.BehaviorSubject<List<IInvoice>> = new Rx.BehaviorSubject(List([]));

    constructor(private http: HttpService, private store: HandleStore) {
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

    add(obj: IInvoice): Rx.Observable<returnObjType> {
        let _observable = this.http.post('/api/invoice/', obj);
        return this.store.add(_observable, this.behavioralSubject$);
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