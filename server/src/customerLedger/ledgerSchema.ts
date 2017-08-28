///<reference path="../../../typings/index.d.ts" />

//import moongose
import * as mongoose from 'mongoose'; 	//import mongodb

//import customer and product schema for embeded doc (sub-document)
import {Schema as customerSchema} from '../customer/index';

// Creating Schema for customer in MongoDB
export let Schema = new mongoose.Schema({
    customer: customerSchema,
    credit: {type: Number, default: 0},
    debit: {type: Number, default: 0},
    remarks: String,    
    dated: { type: Number, default: Date.now }
});

// invoiceSchema.statics.findMax = function (callback) {
//  this.findOne({ country_id: 10 }) // 'this' now refers to the Member class
//    .sort('-score')
//    .exec(callback);
//}

export let LedgerCollection = mongoose.model("Ledgers", Schema);
