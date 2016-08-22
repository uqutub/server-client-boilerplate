import * as express from 'express';

import {IProduct} from './IProduct';
import {ProductCollection} from './productSchema';
import {responseHandler} from '../helper/helper';

export class Product implements IProduct {
    _id: string;
    name: string;
    category: string;
    qty: number;
    rate: number;
    total: number;
    dated: number;

    constructor(product?: IProduct) {
        if (product) {
            this._id = product._id;
            this.name = product.name;
            this.category = product.category;
            this.rate = product.rate;
        }
    } // constructor

    get(response: express.Response, limit: number = 10) {
        return new Promise((resolve, reject) => {
            let findQuery = ProductCollection.find({}).sort({ dated: -1 }).limit(limit);
            findQuery.exec((err, data) => {
                responseHandler(err, data, resolve, reject, response);
            });
        });
    } // get

    add(response: express.Response, product: IProduct) {
        return new Promise((resolve, reject) => {
            let productObj = new ProductCollection(product);
            productObj.save((err, data: IProduct) => {
                responseHandler(err, data, resolve, reject, response);
            });
        });
    } // add

    delete(response: express.Response, id: string) {
        return new Promise((resolve, reject) => {
            ProductCollection.findById(id, (err, data) => {
                if (err) {
                    responseHandler(err, data, resolve, reject, response);
                } else {
                    data.remove((err) => {
                        responseHandler(err, null, resolve, reject, response);
                    });
                }
            });
        });
    } // delete

}