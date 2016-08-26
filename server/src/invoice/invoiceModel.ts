// https://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose
import * as express from 'express';

import {IInvoice as Interface} from './IInvoice';
import {ICustomer} from '../customer/index';
import {IProduct} from '../product/index';
import {InvoiceCollection as Collection} from './invoiceSchema';
import {responseHandler} from '../helper/helper';

export class Invoice implements Interface {
	_id: string;
    customer: ICustomer;
    product: IProduct[];
    total: number;
    dated: number;

	constructor(object?: Interface) {
		if (object) {
			this._id = object._id;
			this.customer = object.customer;
			this.product = object.product;
			this.total = object.total;
			this.dated = object.dated;
		}
	}

	get(expressResponse: express.Response, limit: number = 10) {
		return new Promise((resolve, reject) => {
			let findQuery = Collection.find({}).sort({ dated: -1 }).limit(limit);
			findQuery.exec((err, data: Interface[]) => {
				responseHandler(err, data, resolve, reject, expressResponse);
			});
		});
	} // get

	add(expressResponse: express.Response, customer: Interface) {
		return new Promise((resolve, reject) => {
			let customerObj = new Collection(customer);
			customerObj.save((err, data: Interface) => {
				responseHandler(err, data, resolve, reject, expressResponse);
			});
		});
	} // add

	delete(expressResponse: express.Response, id: string) {
		return new Promise((resolve, reject) => {
			Collection.findById(id, (err, data) => {
				if (err) {
					responseHandler(err, data, resolve, reject, expressResponse);
				} else {
					data.remove((err) => {
						responseHandler(err, null, resolve, reject, expressResponse);
					});
				}
			});
		});
	} // delete
}