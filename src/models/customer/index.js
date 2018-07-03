import fs from 'fs';
import path from 'path';
import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import stringQuery from 'mongoose-string-query';
import mongooseDelete from 'mongoose-delete';

import { DB } from '../../constants'

const CustomerSchema = new Schema({
    _id: String,
    customerName: {
        type: String,
        required: true
    },
    customerAddress: [{
        deleted: {
            type: Boolean,
            default: false
        },
        address:{
            type: String,
            required: true
        }
    }]
});

// automatically adds createdAt and updatedAt timestamps
CustomerSchema.plugin(timestamps);
CustomerSchema.plugin(stringQuery);
CustomerSchema.plugin(mongooseDelete, {overrideMethods: true, validateBeforeDelete: false});

const Customer = mongoose.model(DB.COLLECTIONS.CUSTOMER, CustomerSchema);
export default Customer;

// Code Below this line is temprary code
// This code populates the fake data to the customer table
Customer.count((err, count) => {
    if(!err && !count){
        Customer.insertMany(JSON.parse(fs.readFileSync(path.join(process.cwd(), 'faker', 'customer.json'), 'utf-8')),
        (err, docs) => {
            
        });
    }
});