import Customer from '../../models/customer';
import Order from '../../models/order';

import logger from '../../utils/logger';

//This is used to filter data before send it to client
import { EXPOSED_NODE } from '../../constants';


/**
* Getting Customer by customerId
* @param {object} req 
* @param {object} res 
*/
exports.getById = (req, res) => {

    logger.debug(`[Customer get] customerId: ${req.params.customerId}`);

    Customer.findById(req.params.customerId)
    .select(EXPOSED_NODE.CUSTOMER)
    .then( customer => {
        logger.debug(`[Customer get] customer query result: ${JSON.stringify(customer)}`);
        res.json(customer);
    });
};

/**
* Updating a customer by customerId
* @param {object} req 
* @param {object} res 
*/
exports.patch = (req, res) => {
    logger.debug(`[Customer Patch] customerId: ${req.params.customerId}, payload: ${JSON.stringify(req.body)}`);
    
    Customer.findByIdAndUpdate(req.params.customerId, req.body, {new: true})
    .select(EXPOSED_NODE.CUSTOMER)
    .then( customer => {

        logger.debug(`[Customer Patch] query result: ${JSON.stringify(customer)}`);

        if(!customer){
            logger.debug(`[Customer Patch] customer not found by customerId: ${req.params.customerId}`);
            return res.sendStatus(404);
        }

        res.json(customer);
        
    })
    .catch( err => {
        logger.error(`[Customer Patch] query error: ${err.message}`);
        res.status(422).send(err.message);
    });
};

/**
* Add new address for the customer
* @param {object} req 
* @param {object} res 
*/
exports.addAddress = (req, res) => {

    logger.debug(`[addAddress] addressId: ${req.params.customerId}, payload: ${JSON.stringify(req.body)}`);

    Customer.findOneAndUpdate(
        {
            _id: req.params.customerId
        },
        {
            "$push": {"customerAddress": req.body}
        },
        {new: true}
    )
    .then( address => {

        logger.debug(`[addAddress] query result: ${JSON.stringify(address)}`);

        if(!address){
            logger.debug(`[addAddress] address not found by customerId: ${req.params.customerId}`);
            return res.sendStatus(404);
        }

        res.json(address);

    })
    .catch( err => {
        logger.error(`[Address Update] query error: ${err.message}`);
        res.status(422).send(err.message);
    });
};
/**
* Update a address by addressId
* @param {object} req 
* @param {object} res 
*/
exports.updateAddress = (req, res) => {

    logger.debug(`[updateAddress] addressId: ${req.params.addressId}`);

    Customer.findOneAndUpdate(
        {
            customerAddress: { $elemMatch: { _id: req.params.addressId, deleted: false}}
        },
        {
            "$set": {"customerAddress.$.address": req.body.address}
        }
    )
    .select(EXPOSED_NODE.ADDRESS)
    .then( address => {

        logger.debug(`[updateAddress] query result: ${JSON.stringify(address)}`);

        if(!address){
            logger.debug(`[updateAddress] address not found by addressId: ${req.params.addressId}`);
            return res.sendStatus(404);
        }

        res.json(address);

    })
    .catch( err => {
        logger.error(`[Address Update] query error: ${err.message}`);
        res.status(422).send(err.message);
    });
};

/**
* Soft delete a address by addressId
* @param {object} req 
* @param {object} res 
*/
exports.deleteAddress = (req, res) => {

    logger.debug(`[deleteAddress] addressId: ${req.params.addressId}`);

    Customer.findOneAndUpdate(
        {
            customerAddress: { $elemMatch: { _id: req.params.addressId, deleted: false}}
        },
        {
            "$set": {"customerAddress.$.deleted": true}
        }
    ).then( address => {

        logger.debug(`[deleteAddress] query result: ${JSON.stringify(address)}`);

        if(!address){
            logger.debug(`[deleteAddress] address not found by addressId: ${req.params.addressId}`);
            return res.sendStatus(404);
        }

        res.sendStatus(204);

    })
    .catch( err => {
        logger.error(`[Address Delete] query error: ${err.message}`);
        res.status(422).send(err.message);
    });
};

/**
* Get total amount paid by a customer using customerId
* @param {object} req 
* @param {object} res 
*/
exports.getTotalAmount = (req, res) => {
    logger.debug(`[getTotalAmount] customerId: ${req.params.customerId}`);

    Order.aggregate()
    .match({customerId: req.params.customerId})
    .group({
        _id: "$customerId",
        totalAmount: {$sum: '$price'},
        totalProducts: {$sum: 1}
    })
    .then((rec) => {
        logger.debug(`[getTotalAmount] item length: ${rec.length}`);
        res.json(rec);
    });
};
