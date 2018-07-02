import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import stringQuery from 'mongoose-string-query';
import mongooseDelete from 'mongoose-delete';

import Customer from '../customer';
import { DB } from '../../constants'
import { getNextSequenceValue, setNextSequenceValue } from '../../utils/db/sequence-value';
import logger from '../../utils/logger';

const OrderSchema = new Schema({
    _id: {
        type: Number
    },
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency:{
        type: String,
        required: true
    },
    addressId: {
        type: String,
        require: true
    },
    customerId: {
        type: String,
        resolve: true
    }
});

/**
* Save pre hook to get next sequence value for `id`
*/
OrderSchema.pre('save', function(next) {
    
    //Validate if Customer exist with provided customerId
    Customer.find(
        {_id: this.customerId},
        {customerAddress: { $elemMatch: { _id: this.addressId}}},
        (err, customer)=>{
            
            logger.debug(`[OrderSchama] PreSave query response: ${customer}`);

            if(err || !customer.length){
                logger.error(`[OrderSchema] PreSave - error: ${err} | customer: ${customer}`);
                return next(err || new Error('Customer not found with the given customerId'));
            }
            
            if(customer[0] && !customer[0].customerAddress.length) {
                return next(new Error('Customer address not found with the given addressId'));
            }
            
            getNextSequenceValue.call(this, next, 'orderId', '_id');
            
        });
    });
    
    /**
    * Save post hook to set next sequence value for `id`.
    * This hook is used to avoid any inconsestency in sequence if document doesn't get created
    */
    OrderSchema.post('save', function(doc) {
        setNextSequenceValue.call(this, doc, 'orderId');
    });
    
    // automatically adds createdAt and updatedAt timestamps
    OrderSchema.plugin(timestamps);
    OrderSchema.plugin(stringQuery);
    OrderSchema.plugin(mongooseDelete, {overrideMethods: true, validateBeforeDelete: false});
    
    export default mongoose.model(DB.COLLECTIONS.ORDER, OrderSchema);