// https://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose
import * as express from 'express';

import {IInvoice as Interface} from './IInvoice';
import {ICustomer} from '../customer/index';
import {IProduct} from '../product/index';
import {InvoiceCollection as Collection} from './invoiceSchema';
import {responseHandler} from '../helper/helper';

// customer ledger model for when invoice create, maintain customer ledger
import {Model as LedgerModel, ILedger} from '../customerLedger/index';

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

	add(expressResponse: express.Response, invoice: Interface) {
		return new Promise((resolve, reject) => {
			let invoiceObj = new Collection(invoice);
			invoiceObj.save((err: boolean, _invoice: Interface) => {
				if (!err) {
					let ledgerObj: ILedger = {
						customer: _invoice.customer,
						credit: _invoice.total,
						debit: 0,
						remarks: 'Angainst Invoice # ' + _invoice._id,
						dated: Date.now()
					};
					let ledgerModel: LedgerModel = new LedgerModel();
					ledgerModel.add(expressResponse, ledgerObj).then(_ledger => {
						responseHandler(err, { ledger: _ledger, invoice: _invoice }, resolve, reject, expressResponse);
					}).catch(error => {
						responseHandler(error, null, resolve, reject, expressResponse);
					});
				} else { // if !!err
					responseHandler(err, _invoice, resolve, reject, expressResponse);
				} // else !!err
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