///<reference path="../../../typings/index.d.ts" />

//import moongose
import * as mongoose from 'mongoose'; 	//import mongodb

//import customer and product schema for embeded doc (sub-document)
import {Schema as customerSchema} from '../customer/index';
import {Schema as productSchema} from '../product/index';

// Creating Schema for customer in MongoDB
export let Schema = new mongoose.Schema({
    customer: customerSchema,
    product: [productSchema],
    total: Number,
    dated: { type: Number, default: Date.now }
});

//invoiceSchema.statics.findMax = function (callback) {
//  this.findOne({ country_id: 10 }) // 'this' now refers to the Member class
//    .sort('-score')
//    .exec(callback);
//}

export let InvoiceCollection = mongoose.model("Invoices", Schema);
