import * as express from 'express';

import {ICustomer} from './ICustomer';
import {Customer} from './customerModel';
import {responseJsonHandler} from '../helper/helper';

let model: Customer = new Customer();

export let controller = {
    get: (request: express.Request, response: express.Response) => {
        model.get(response).then((data: ICustomer[]) => {
            responseJsonHandler(null, data, response);
        });
    },
    post: (request: express.Request, response: express.Response) => {
        let obj: ICustomer = request.body;
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
            responseJsonHandler('Id Not Matched!', null, response);
        }
    },
    delete: (request: express.Request, response: express.Response) => {
        // if (request.params.id === request.body.id) {
        if (request.params.id) {
            model.delete(response, request.params.id).then(data => {
                responseJsonHandler(null, data, response);
            });
        } else {
            responseJsonHandler('Id Not Matched!', null, response);
        }
    }
};
