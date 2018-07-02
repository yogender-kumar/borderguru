import Order from '../controllers/order';
import express from 'express';

let router = express.Router();

router.get('/v1/orders', Order.list);
router.get('/v1/orders/:orderId', Order.get);
router.post('/v1/orders', Order.post);
router.patch('/v1/orders/:orderId', Order.patch);
router.delete('/v1/orders/:orderId', Order.delete);
router.get('/v1/orders/byCustomer/:customerId', Order.getByCustomerId);
router.get('/v1/orders/byAddress/:addressId', Order.getByAddressId);

module.exports = router;