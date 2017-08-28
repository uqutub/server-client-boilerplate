import {Injectable} from '@angular/core';
// import {BehaviorSubject, Observable} from 'rxjs';
import Rx = require('rxjs/Rx');
import {List} from 'immutable';

import {ILedger} from '../../models/index';
import {returnObjType} from '../../helper/helper';
import {HttpService} from '../../services/index';
import {HandleStore} from '../handleStore';

@Injectable()
export class CustomerLedgerStore {

    once: boolean = false;
    // behavioralSubject as Ledgers
    private behavioralSubject$: Rx.BehaviorSubject<List<ILedger>> = new Rx.BehaviorSubject(List([]));

    constructor(private http: HttpService, private store: HandleStore) {
        console.log('Observable store for customer.... Contructor Loaded');
    }

    loadData(): void {
        let _observable = this.http.get('/api/cledger/');
        this.store.get(_observable, this.behavioralSubject$).subscribe(res => {
            if (!res.err) {
                this.once = true;
            }
        });
    }

    reloadData(): void {
        this.loadData();
    }

    get(): Rx.Observable<List<ILedger>> {
        if (this.once) {
            return this.behavioralSubject$.asObservable();
        } else {
            this.loadData();
            return this.behavioralSubject$.asObservable();
        }
    }

    add(obj: ILedger, apiRequest: boolean = true): Rx.Observable<returnObjType> {
        if (apiRequest) {
            let _observable = this.http.post('/api/cledger/', obj);
            return this.store.add(_observable, this.behavioralSubject$);
        } else {
            let oldState = this.behavioralSubject$.getValue();
            let newState = oldState.push(obj)
            this.behavioralSubject$.next(newState);
        }
    }

    // update(obj: ILedger): Rx.Observable<returnObjType> {
    //     let _observable = this.http.put('/api/cledger/' + obj._id, obj);
    //     return this.store.update(obj, _observable, this.behavioralSubject$);
    // }

    // delete(id: string): Rx.Observable<returnObjType> {
    //     let _observable = this.http.delete('/api/cledger/' + id);
    //     return this.store.delete(id, _observable, this.behavioralSubject$);
    // }

}