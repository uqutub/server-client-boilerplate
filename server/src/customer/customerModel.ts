// https://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose
import * as express from 'express';

import {ICustomer} from './ICustomer';
import {CustomerCollection} from './customerSchema';
import {responseHandler} from '../helper/helper';

export class Customer implements ICustomer {
	_id: string;
	name: string;
	company: string;
	address: string;
	phone: string;
	mobile: string;
	salesTax: string;
	ntn: string;
	dated: number;

	constructor(customer?: ICustomer) {
		if (customer) {
			this._id = customer._id;
			this.name = customer.name;
			this.company = customer.company;
			this.address = customer.address;
			this.phone = customer.phone;
			this.mobile = customer.mobile;
			this.salesTax = customer.salesTax;
			this.ntn = customer.ntn;
			this.dated = customer.dated;
		}
	}

	get(expressResponse: express.Response, limit: number = 10) {
		return new Promise((resolve, reject) => {
			let findQuery = CustomerCollection.find({}).sort({ dated: -1 }).limit(limit);
			findQuery.exec((err, data: ICustomer[]) => {
				responseHandler(err, data, resolve, reject, expressResponse);
			});
		});
	} // get

	add(expressResponse: express.Response, customer: ICustomer) {
		return new Promise((resolve, reject) => {
			let customerObj = new CustomerCollection(customer);
			customerObj.save((err, data: ICustomer) => {
				responseHandler(err, data, resolve, reject, expressResponse);
			});
		});
	} // add

	delete(expressResponse: express.Response, id: string) {
		return new Promise((resolve, reject) => {
			CustomerCollection.findById(id, (err, data) => {
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