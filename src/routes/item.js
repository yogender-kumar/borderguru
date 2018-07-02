import Item from '../controllers/item';
import express from 'express';

let router = express.Router();
router.get('/v1/item/groupByName', Item.getItemGroupByName);

module.exports = router;