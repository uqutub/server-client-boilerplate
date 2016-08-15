// https://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose

import {ICustomer} from './ICustomer';
import {CustomerCollection} from './customerSchema';

export class Customer implements ICustomer {
	_id: string;
	name: string;
	company: string;
	address: string;
	phone: string;
	mobile: string;
	salesTax: string;
	ntn: string;
	
	constructor(customer?: ICustomer) {
		if(customer){
			this._id = customer._id;
			this.name = customer.name;
			this.company = customer.company;
			this.address = customer.address;
			this.phone = customer.phone;
			this.mobile = customer.mobile;
			this.salesTax = customer.salesTax;	
			this.ntn = customer.ntn;
		}
	}
	
	get(limit: number = 10, cb: Function) {
		var findQuery = CustomerCollection.find({}).sort({dated : -1}).limit(limit);
		findQuery.exec(function(err, maxResult){
		    this.callBackFnc(err, maxResult, cb);
		});
	}
	
	add(customer: ICustomer, cb: Function) {
		let customerObj = new CustomerCollection(customer);
		customerObj.save((err, data: ICustomer)=>{
			this.callBackFnc(err, data, cb);
		});
	}
	
	delete(id: string, cb: Function) {
		CustomerCollection.findById(id, (err, data) => {
			if(err){
				this.callBackFnc(err, data, cb);
			} else {
				CustomerCollection.remove(data, 
                (err) => {					
					this.callBackFnc(err, null, cb);
				});
			}
		});
	}

	callBackFnc(err, data, cb: Function) {
		if(err) {
			cb(err, null)
		} else {
			cb(null, data);
		}
	}
}