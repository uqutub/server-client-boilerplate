import {Injectable} from '@angular/core'
import {returnObjType} from '../helper/helper';
// import {BehaviorSubject, Observable} from 'rxjs';
import Rx = require('rxjs/Rx');
import {List} from 'immutable';

@Injectable()
export class HandleStore {

    constructor() {

    }

    get(_observable: Rx.Observable<returnObjType>, _subject: Rx.BehaviorSubject<List<any>>): Rx.Observable<returnObjType> {
        _observable.subscribe((res) => {
            if (!res.err) {
                let newState: List<any> = <List<any>>_subject.getValue().concat(res.data);
                _subject.next(newState);
            }
        });
        return _observable;
    }

    add(_observable: Rx.Observable<returnObjType>, _subject: Rx.BehaviorSubject<List<any>>): Rx.Observable<returnObjType> {
        _observable.subscribe((res) => {
            if (!res.err) {
                let oldState = _subject.getValue();
                let newState = oldState.push(res.data)
                _subject.next(newState);
                // Method #2
                // let newState: List<any> = <List<any>> _subject.getValue().concat(res.data);
            }
        });
        return _observable;
    }

    update(object: any, _observable: Rx.Observable<returnObjType>, _subject: Rx.BehaviorSubject<List<any>>): Rx.Observable<returnObjType> {
        _observable.subscribe((res) => {
            if (!res.err) {
                let oldState: List<any> = _subject.getValue();
                let index = oldState.findIndex((cust: any) => cust._id === object._id);
                let newState = oldState.set(index, object);
                // let customer: ICustomer = oldState.get(index);
                _subject.next(newState);

                // Method #2
                // let newState: List<any> = <List<any>> oldState.map((obj) => {
                //     if (obj._id === object._id) {
                //         let newObj = object;
                //         return newObj;
                //     } else {
                //         return obj;
                //     }
                // });
                // this.customers$.next(newState);
            }
        });
        return _observable;
    }

    delete(id: string, _observable: Rx.Observable<returnObjType>, _subject: Rx.BehaviorSubject<List<any>>): Rx.Observable<returnObjType> {
        _observable.subscribe((res) => {
            if (!res.err) {
                let oldState: List<any> = <List<any>>_subject.getValue();
                let newState: List<any> = <List<any>>oldState.filter((customer) => customer._id !== id);
                _subject.next(newState);

                // Method #2
                // let index = oldState.findIndex((obj) => obj._id === id);   
                // let newState = oldState.delete(index);
                // this.customers$.next(newState);
            }
        });

        return _observable;
    }
}
