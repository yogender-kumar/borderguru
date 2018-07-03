import Order from '../../models/order';

import logger from '../../utils/logger';


/**
* Group item by name from orders and sorting by number of occurance, name
* @param {object} req 
* @param {object} res 
*/
exports.getItemGroupByName = (req, res) => {

    logger.debug(`[getItemGroupByName] init query`);

    Order.aggregate()
    .group({
        _id: '$itemName',
        count: {$sum: 1},
        price: {$first: '$price'}
    })
    .sort({'count': -1, '_id': 1})
    .then((rec) => {
        logger.debug(`[getItemGroupByName] item length: ${rec.length}`);
        res.json(rec);
    });
};