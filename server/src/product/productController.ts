import * as express from 'express';

import {IProduct} from './IProduct';
import {Product} from './productModel';
import {responseJsonHandler} from '../helper/helper';

let productModel: Product = new Product();

export let controller = {
    get: (request: express.Request, response: express.Response) => {
        productModel.get(response).then((data: IProduct[]) => {
            responseJsonHandler(null, data, response);
        });
    },
    post: (request: express.Request, response: express.Response) => {
        let obj: IProduct = request.body;
        productModel.add(response, obj).then(data => {
            responseJsonHandler(null, data, response);
        });
    },
    put: (request: express.Request, response: express.Response) => {
        if (request.params.id === request.body.id) {
            // productModel.update(response, request.body.id).then(data => {
            //     responseJsonHandler(null, data, response);
            // });
        } else {
            responseJsonHandler('Id Not Matched!', null, response);
        }
    },
    delete: (request: express.Request, response: express.Response) => {
        // if (request.params.id === request.body.id) {
        if (request.params.id) {
            productModel.delete(response, request.params.id).then(data => {
                responseJsonHandler(null, data, response);
            });
        } else {
            responseJsonHandler('Id Not Matched!', null, response);
        }
    }
};