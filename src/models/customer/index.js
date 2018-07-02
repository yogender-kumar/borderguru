import fs from 'fs';
import path from 'path';
import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

import { DB } from '../../constants'

const CustomerSchema = new Schema({
    _id: String,
    order: [String],
    customerName: {
        type: String,
        required: true
    },
    customerAddress: [{
        _id: String,
        address:{
            type: String,
            required: true
        }
    }]
});

// automatically adds createdAt and updatedAt timestamps
CustomerSchema.plugin(timestamps);

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