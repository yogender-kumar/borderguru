import Customer from '../controllers/customer';
import express from 'express';

let router = express.Router();
router.get('/v1/customers/:customerId', Customer.getById);
router.patch('/v1/customers/:customerId', Customer.patch);
router.post('/v1/customers/addAddress/:customerId', Customer.addAddress);
router.patch('/v1/customers/updateAddress/:addressId', Customer.updateAddress);
router.delete('/v1/customers/deleteAddress/:addressId', Customer.deleteAddress);
router.get('/v1/customers/getTotalAmount/:customerId', Customer.getTotalAmount);

module.exports = router;