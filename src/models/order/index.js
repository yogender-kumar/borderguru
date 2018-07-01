import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import stringQuery from 'mongoose-string-query';

import { getNextSequenceValue, setNextSequenceValue } from '../../utils/db/sequence-value';
import logger from '../../utils/logger';

const OrderSchema = new Schema({
    id: {
        type: Number,
        index: {unique: true}
    },
    customerName: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
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
    }
});

/**
 * Save pre hook to get next sequence value for `id`
 */
OrderSchema.pre('save', function(next) {
    getNextSequenceValue.call(this, next, 'orderId', 'id');
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

export default mongoose.model('order', OrderSchema);