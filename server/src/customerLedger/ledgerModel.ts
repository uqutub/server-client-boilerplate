// https://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose
import * as express from 'express';

import {ILedger as Interface} from './ILedger';
import {ICustomer} from '../customer/index';
import {IInvoice} from '../invoice/index';
import {LedgerCollection as Collection} from './ledgerSchema';
import {responseHandler, responseJsonHandler} from '../helper/helper';

export class Ledger implements Interface {
	_id: string;
    customer: ICustomer;
    credit: number;
    debit: number;
    remarks: string;
    dated: number;

	constructor(object?: Interface) {
		if (object) {
			this._id = object._id;
			this.customer = object.customer;
            this.credit = object.credit;
            this.debit = object.debit;
            this.remarks = object.remarks;
			this.dated = object.dated;
		}
	}

	get(expressResponse: express.Response, limit: number = 10) {
		return new Promise((resolve, reject) => {
			let query = Collection.find({}).sort({ dated: -1 }).limit(limit);
			// query.exec().then((data, err) => {
			// 	responseHandler(err, data, resolve, reject, expressResponse);
			// })
			query.exec((err, data: Interface[]) => {
				responseHandler(err, data, resolve, reject, expressResponse);
			});
		});
	} // get

	add(expressResponse: express.Response, ledger: Interface) {
		return new Promise((resolve, reject) => {
			let ledgerObj = new Collection(ledger);
			ledgerObj.save((err, data: Interface) => {
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