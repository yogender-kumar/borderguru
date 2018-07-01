import Order from '../../models/order';

import logger from '../../utils/logger';


/**
 * Getting the list of all orders
 * @param {object} req 
 * @param {object} res 
 */
exports.list = (req, res) => {

    logger.info(`[Order List] request query string: ${req.query}`);

    Order.apiQuery(req.query || {})
    .select('-_id id customerName customerAddress itemName price currency createdAt updatedAt')
    .then( user => {
        logger.debug(`[Order List] query result: ${JSON.stringify(user)}`);
        res.json(user);
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
exports.get = (req, res) => {
    res.send('This is get API or order');
};

/**
 * Creating a order
 * @param {object} req 
 * @param {object} res 
 */
exports.post = (req, res) => {

    logger.debug(`[Order List] request payload: ${JSON.stringify(req.body)}`);

    Order.create(req.body || {})
    .then( user => {
        res.json(user);
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
exports.put = (req, res) => {
    res.send('This is put API or order');
};

/**
 * Deleting a order by orderId
 * @param {object} req 
 * @param {object} res 
 */
exports.delete = (req, res) => {
    res.send('This is delete API or order');
};