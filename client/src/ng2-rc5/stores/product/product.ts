import {Injectable} from '@angular/core'
// import {BehaviorSubject, Observable} from 'rxjs';
import Rx = require('rxjs/Rx');
import {List} from 'immutable';

import {IProduct} from '../../models/index';
import {returnObjType} from '../../helper/helper';
import {HttpService} from '../../services/index';
import {HandleStore} from '../handleStore';

@Injectable()
export class ProductStore {

    once: boolean = false;
    private products$: Rx.BehaviorSubject<List<IProduct>> = new Rx.BehaviorSubject(List([]));

    constructor(private http: HttpService, private store: HandleStore) {
        console.log('Observable store for product.... Contructor Loaded');
    }

    loadData(): void {
        let _observable = this.http.get('/api/product/');
        this.store.get(_observable, this.products$).subscribe(res => {
            if (!res.err) {
                this.once = true;
            }
        });
    }

    reloadData(): void {
        this.loadData();
    }

    get(): Rx.Observable<List<IProduct>> {
        if (this.once) {
            return this.products$.asObservable();
        } else {
            this.loadData();
            return this.products$.asObservable();
        }
    }

    add(obj: IProduct): Rx.Observable<returnObjType> {
        let _observable = this.http.post('/api/product/', obj);
        return this.store.add(_observable, this.products$);
    }

    update(obj: IProduct): Rx.Observable<returnObjType> {
        let _observable = this.http.put('/api/product/' + obj._id, obj);
        return this.store.update(obj, _observable, this.products$);
    }

    delete(id: string): Rx.Observable<returnObjType> {
        let _observable = this.http.delete('/api/product/' + id);
        return this.store.delete(id, _observable, this.products$);
    }
}


// // interface of product
// export interface IProduct {
//     _id?: string;
//     name: string;
//     category?: string;
//     cost: number;
//     dated?: number;
// }