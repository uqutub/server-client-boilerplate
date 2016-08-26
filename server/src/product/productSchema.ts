///<reference path="../../../typings/index.d.ts" />

// import moongose
import * as mongoose from 'mongoose'; 	//import mongodb

// Creating Schema for product in MongoDB
export let Schema = new mongoose.Schema({
    name: String,
    category: String,
    cost: String,
    qty: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    dated: { type: Number, default: Date.now }
});

//productSchema.statics.findMax = function (callback) {
//  this.findOne({ country_id: 10 }) // 'this' now refers to the Member class
//    .sort('-score')
//    .exec(callback);
//}

export let ProductCollection = mongoose.model("Products", Schema);
