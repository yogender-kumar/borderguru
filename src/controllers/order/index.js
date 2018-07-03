import Order from '../../models/order';
import Customer from '../../models/customer';

import logger from '../../utils/logger';

//This is used to filter data before send it to client
import { EXPOSED_NODE } from '../../constants';

let orderFieldsArr = EXPOSED_NODE.ORDER.split(/\s+/g);


/**
* Getting the list of all orders
* @param {object} req 
* @param {object} res 
*/
exports.list = (req, res) => {
    
    logger.debug(`[Order List] request query string: ${req.query}`);
    
    Order.apiQuery(req.query || {})
    .select(EXPOSED_NODE.ORDER)
    .then( order => {
        logger.debug(`[Order List] query result: ${JSON.stringify(order)}`);
        res.json(order);
    })
    .catch( err => {
        logger.error(`[Order List] query error: ${err.message}`);
        res.status(422).send(err.message);
    });
    
};

/**
* Getting a order by orderId
* @param {object} req 
* @param {object} res 
*/
exports.getById = (req, res) => {
    logger.debug(`[Order Get] orderId: ${req.params.orderId}`);
    
    Order.findById(req.params.orderId)
    .select(EXPOSED_NODE.ORDER)
    .then( order => {
        
        logger.debug(`[Order Get] order query result: ${JSON.stringify(order)}`);
        getCustomerInfoForOrder(order.customerId, order.addressId, (data)=> {
            order._doc.customer = data;
            res.json(order);
        });
        
    })
    .catch( err => {
        logger.error(`[Order Get] query error: ${err.message}`);
        res.status(422).send(err.message);
    });
};

/**
* Creating a order
* @param {object} req 
* @param {object} res 
*/
exports.post = (req, res) => {
    
    logger.debug(`[Order List] request payload: ${JSON.stringify(req.body)}`);
    
    Order.create(req.body || {})
    .then( order => {

        logger.debug(`[Order Post] query result: ${JSON.stringify(order)}`);

        let orderObject = orderFieldsArr.reduce( (accum, key) => ((accum[key] = order[key]) && accum), {})
        getCustomerInfoForOrder(order.customerId, order.addressId, (data)=> {
            orderObject.customer = data;
            res.json(orderObject);
        });

    })
    .catch( err => {
        logger.error('Order Post - ', err.message);
        res.status(500).send(err.message);
    });
    
};

/**
* Updating a order by orderId
* @param {object} req 
* @param {object} res 
*/
exports.patch = (req, res) => {
    logger.debug(`[Order Put] orderId: ${req.params.orderId}, payload: ${JSON.stringify(req.body)}`);
    
    Order.findByIdAndUpdate(req.params.orderId, req.body, {new: true})
    .select(EXPOSED_NODE.ORDER)
    .then( order => {
        if(!order){
            logger.debug(`[Order Put] order not found by orderId: ${req.params.orderId}`);
            return res.sendStatus(404);
        }

        logger.debug(`[Order Put] query result: ${JSON.stringify(order)}`);

        getCustomerInfoForOrder(order.customerId, order.addressId, (data)=> {
            order._doc.customer = data;
            res.json(order);
        });
    })
    .catch( err => {
        logger.error(`[Order Put] query error: ${err.message}`);
        res.status(422).send(err.message);
    });
};

/**
* Soft delete a order by orderId
* @param {object} req 
* @param {object} res 
*/
exports.delete = (req, res) => {
    logger.debug(`[Order Delete] orderId: ${req.params.orderId}`);
    
    Order.delete({_id: req.params.orderId})
    .then( (err, order) => {

        if(!order){
            logger.debug(`[Order Delete] order not found by orderId: ${req.params.orderId}`);
            return res.sendStatus(404);
        }

        logger.debug(`[Order Delete] query result: ${JSON.stringify(order)}`);

        res.sendStatus(204);

    })
    .catch( err => {
        logger.error(`[Order Delete] query error: ${err.message}`);
        res.status(422).send(err.message);
    });
};

/**
* Getting a order by orderId
* @param {object} req 
* @param {object} res 
*/
exports.getByCustomerId = (req, res) => {

    logger.debug(`[Order GetByCustomer] customerId: ${req.params.customerId}`);
    
    Order.find({customerId: req.params.customerId})
    .select(EXPOSED_NODE.ORDER)
    .then( order => {

        logger.debug(`[Order GetByCustomer] query result: ${JSON.stringify(order)}`);

        getCustomerInfoForOrder(req.params.customerId, null, (data)=> {
            res.json({orders: order, customer: data});
        });

    })
    .catch( err => {
        logger.error(`[Order GetByCustomer] query error: ${err.message}`);
        res.status(422).send(err.message);
    });
};

/**
* Getting a order by orderId
* @param {object} req 
* @param {object} res 
*/
exports.getByAddressId = (req, res) => {

    logger.debug(`[Order GetByAddress] addressId: ${req.params.addressId}`);
    
    Order.find({addressId: req.params.addressId})
    .select(EXPOSED_NODE.ORDER)
    .then( order => {
        logger.debug(`[Order GetByAddress] query result: ${JSON.stringify(order)}`);
        res.json(order);
    })
    .catch( err => {
        logger.error(`[Order GetByAddress] query error: ${err.message}`);
        res.status(422).send(err.message);
    });
    
};


/**
* This method updates the information about the customer & address in `order` document
* @param {string} cId document id of the customer
* @param {string} aId document id of the address
* @param {function} done callback function
*/
function getCustomerInfoForOrder (cId, aId, done) {

    logger.debug(`[getCustomerInfoForOrder] initialization with cId: ${cId} & aId: ${aId}`);

    if(!cId)
    return done();

    Customer.findById(cId)
    .select(EXPOSED_NODE.CUSTOMER)
    .then(customer => {
        if(aId){
            customer.customerAddress = customer.customerAddress.find( address => address._id == aId);
        }
        logger.debug(`[getCustomerInfoForOrder] query result: ${JSON.stringify(customer)}`);
        done(customer);
        
    })
    .catch( err => {
        
        logger.error(`[getCustomerInfoForOrder] query error: ${err.message}`);
        done();
        
    });
}
