///<reference path="../../../typings/index.d.ts" />

//import moongose
import * as mongoose from 'mongoose'; 	//import mongodb

// Creating Schema for customer in MongoDB
let customerSchema = new mongoose.Schema({
    name: String,
    company: String,
    address: String,
    phone: String,
    mobile: String,
    salesTax: String,
    ntn: String,
    dated: { type: Number, default: Date.now }
});

//customerSchema.statics.findMax = function (callback) {
//  this.findOne({ country_id: 10 }) // 'this' now refers to the Member class
//    .sort('-score')
//    .exec(callback);
//}

export let CustomerCollection = mongoose.model("Customers", customerSchema);
