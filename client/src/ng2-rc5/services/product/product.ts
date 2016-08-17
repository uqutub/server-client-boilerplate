import {Injectable} from '@angular/core'

@Injectable()
export class ProductService {
    customers: IProduct[] = [];

    constructor() {

    }

    get() {

    }

    add() {

    }

    update() {

    }

    delete() {

    }
}


// interface of customer
export interface IProduct {
    _id?: string;
    name: string;
    category?: string;
    cost: number;
    dated?: number;
}