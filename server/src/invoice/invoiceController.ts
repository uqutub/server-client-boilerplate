import * as express from 'express';

import {IInvoice as Interface} from './IInvoice';
import {Invoice} from './invoiceModel';
import {responseJsonHandler} from '../helper/helper';

let model: Invoice = new Invoice();

export let controller = {
    get: (request: express.Request, response: express.Response) => {
        model.get(response).then((data: Interface[]) => {
            responseJsonHandler(null, data, response);
        });
    },
    post: (request: express.Request, response: express.Response) => {
        let obj: Interface = request.body;
        model.add(response, obj).then(data => {
            responseJsonHandler(null, data, response);
        });
    },
    put: (request: express.Request, response: express.Response) => {
        if (request.params.id === request.body.id) {
            // model.update(response, request.body.id).then(data => {
            //     responseJsonHandler(null, data, response);
            // });
        } else {
            responseJsonHandler('Id Not found!', null, response);
        }
    },
    delete: (request: express.Request, response: express.Response) => {
        // if (request.params.id === request.body.id) {
        if (request.params.id) {
            model.delete(response, request.params.id).then(data => {
                responseJsonHandler(null, data, response);
            });
        } else {
            responseJsonHandler('Id Not found!', null, response);
        }
    }
};
