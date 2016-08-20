import * as express from 'express';

import {ICustomer} from './ICustomer';
import {Customer} from './customerModel';
import {responseJsonHandler} from '../helper/helper';

let customerModel: Customer = new Customer();

export let controller = {
    get: (request: express.Request, response: express.Response) => {
        customerModel.get(response).then((data: ICustomer[]) => {
            responseJsonHandler(null, data, response);
        });
    },
    post: (request: express.Request, response: express.Response) => {
        let obj: ICustomer = request.body;
        customerModel.add(response, obj).then(data => {
            responseJsonHandler(null, data, response);
        });
    },
    put: (request: express.Request, response: express.Response) => {
        if (request.params.id === request.body.id) {
            // customerModel.update(response, request.body.id).then(data => {
            //     responseJsonHandler(null, data, response);
            // });
        } else {
            responseJsonHandler('Id Not Matched!', null, response);
        }
    },
    delete: (request: express.Request, response: express.Response) => {
        // if (request.params.id === request.body.id) {
        if (request.params.id) {
            customerModel.delete(response, request.params.id).then(data => {
                responseJsonHandler(null, data, response);
            });
        } else {
            responseJsonHandler('Id Not Matched!', null, response);
        }
    }
};
