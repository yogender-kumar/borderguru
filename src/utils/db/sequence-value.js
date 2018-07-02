import mongoose, { Schema } from 'mongoose';

import logger from '../logger';

/**
* This model is used to set auto increment field for other models
* Use this model if there is a need of any autoincremental unique field in any model
*/
const SequenceSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 1
    }
});

const Sequence = mongoose.model('sequence', SequenceSchema);

/**
* This method is exposed to other models to get next sequence value for any field
* @param {function} next to passes reference to next hook of the caller model
* @param {string} seqId is the key for the field of caller model
* @param {string} toUpdate name of field from caller model
*/
export const getNextSequenceValue = function(next, seqId, toUpdate) {

    let doc = this;
    logger.debug(`[getNextSequenceValue] seqId: ${seqId} , toUpdate: ${toUpdate}, doc: ${doc}`);

    if(typeof next !== 'function' || !seqId || !toUpdate){
        logger.error(`[getNextSequenceValue] Missing required params`);
        next();
    }

    Sequence.findById(seqId, (err, sequence) => {
        logger.debug(`[getNextSequenceValue] sequence: ${sequence}`);
        if(err){
            logger.error(`[getNextSequenceValue] query error for seqId: ${seqId}`, err.message);
            return next(err);
        }
        doc[toUpdate] = sequence ? (sequence.seq + 1) : 1;
        next();
    });

};

/**
* This method is exposed to other models to set next sequence value for any field
* @param {object} doc contains the recently created document
* @param {string} seqId is the key for the field of caller model
*/
export const setNextSequenceValue = function(doc, seqId) {

    logger.debug(`[setNextSequenceValue] seqId: ${seqId} , doc: ${doc}`);
    Sequence.findByIdAndUpdate(seqId,
        {$inc: {seq: 1 }},
        {upsert: true},
        (err, sequence) => {
        logger.debug(`[setNextSequenceValue] sequence: ${sequence}`);
        if(err){
            logger.error(`[setNextSequenceValue] query error for seqId ${seqId}`, err.message);
        }
    });

}